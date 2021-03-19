import { AgGridReact } from "ag-grid-react";
import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../modules/auth";
import { firestore, DB_VIRSION } from "../../modules/firebase";
import { getContractsForChainId, getNetworkNameFromChainId } from "../../modules/web3";

import { NFTContract, Metadata } from "../../types";
import { Button } from "../atoms/Button";
import { Loader, useLoader } from "../molecules/Loader";
import { MessageModal, useMessageModal } from "../molecules/MessageModal";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";

export interface SpreadSheetProps {
  nftContract: NFTContract;
  metadataList: Metadata[];
  mintedTokenIds: string[];
  deployed: boolean;
  setState: (input: Metadata[]) => void;
}

export const SpreadSheet: React.FC<SpreadSheetProps> = ({
  nftContract,
  metadataList,
  mintedTokenIds,
  deployed,
  setState,
}) => {
  const [gridApi, setGridApi] = React.useState<any>();
  const [, setGridColumnApi] = React.useState<any>();
  const [internalList, setInternalList] = React.useState<Metadata[]>([]);

  const { openMessageModal, closeMessageModal, messageModalProps } = useMessageModal();
  const { connectWallet } = useAuth();
  const { isLoaderDiplay, openLoader, closeLoader } = useLoader();

  React.useEffect(() => {
    if (!metadataList) return;
    const result = metadataList.map((metadata: any) => {
      if (mintedTokenIds.includes(metadata.tokenId.toString())) {
        metadata.minted = "✅";
      }
      return metadata;
    });
    setInternalList(result);
  }, [metadataList, mintedTokenIds]);

  const saveToFirestore = async () => {
    openLoader();
    const rowData: Metadata[] = [];
    gridApi.forEachNode((node: any) => rowData.push(node.data as Metadata));
    const batch = firestore.batch();
    for (let i = 0; i < rowData.length; i++) {
      batch.set(
        firestore
          .collection(DB_VIRSION)
          .doc(nftContract.chainId)
          .collection("nftContract")
          .doc(nftContract.nftContractAddress)
          .collection("metadata")
          .doc(rowData[i].tokenId.toString()),
        rowData[i]
      );
    }
    await batch.commit();
    setState(rowData);
    closeLoader();
  };

  const exportCSV = () => {
    gridApi.exportDataAsCsv();
  };

  const mintNFTs = async () => {
    if (!deployed) return;
    const { signer } = await connectWallet();
    const signerNetwork = await signer.provider.getNetwork();
    if (nftContract.chainId != signerNetwork.chainId.toString()) {
      const networkName = getNetworkNameFromChainId(nftContract.chainId);
      openMessageModal("🤔", `Please connect ${networkName} network`, "Close", closeMessageModal, closeMessageModal);
      return;
    }

    const selectedNodes = gridApi.getSelectedNodes();
    const selectedRowData: Metadata[] = selectedNodes.map((node: any) => node.data);
    const selectedTokenIds = selectedRowData.map((selectedRow: any) => selectedRow.tokenId);
    if (selectedTokenIds.length == 0) {
      openMessageModal("🤔", `Please select NFT`, "Close", closeMessageModal, closeMessageModal);
      return;
    }

    const toList: string[] = [];
    selectedTokenIds.forEach((selectedTokenId) => {
      if (mintedTokenIds.includes(selectedTokenId.toString())) {
        openMessageModal(
          "🤔",
          `NFT #${selectedTokenId} is already minted`,
          "Close",
          closeMessageModal,
          closeMessageModal
        );
        return;
      }
      toList.push(nftContract.ownerAddress);
    });
    openLoader();
    try {
      const { chocomoldContract, explore } = getContractsForChainId(nftContract.chainId);
      const { hash } = await chocomoldContract
        .attach(nftContract.nftContractAddress)
        .connect(signer)
        ["mint(address[],uint256[])"](toList, selectedTokenIds);
      closeLoader();
      openMessageModal(
        "🎉",
        "NFT is being minted!",
        "Check",
        () => window.open(`${explore}tx/${hash}`),
        closeMessageModal
      );
    } catch (err) {
      closeLoader();
      console.log(err);
    }
  };

  const onGridReady = (params: any) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const columnDefs = [
    {
      field: "tokenId",
      rowGroup: true,
      hide: true,
    },
    {
      field: "name",
    },
    {
      field: "description",
    },
    {
      field: "image",
    },
    {
      field: "animationUrl",
    },
    {
      field: "minted",
      editable: false,
    },
  ];

  const defaultColDef = {
    filter: "agTextColumnFilter",
    resizable: true,
    sortable: true,
    editable: true,
    flex: 1,
  };

  const autoGroupColumnDef = {
    headerName: "tokenId",
    field: "tokenId",
    editable: false,
    cellRendererParams: { checkbox: true },
  };

  return (
    <>
      <div className="mb-2 flex justify-between">
        <div className="flex">
          <div className="mr-2">
            <Link to={`/${nftContract.chainId}/${nftContract.nftContractAddress}/${metadataList.length + 1}`}>
              <Button type="primary" size="small">
                New<span className="ml-2">✨</span>
              </Button>
            </Link>
          </div>
          <div className="mr-2">
            <Button onClick={saveToFirestore} type="primary" size="small">
              Save<span className="ml-2">💾</span>
            </Button>
          </div>
          <div className="mr-2">
            <Button onClick={mintNFTs} type="primary" size="small" disabled={!deployed}>
              Mint<span className="ml-2">💎</span>
            </Button>
          </div>
        </div>
        <div>
          <Button onClick={exportCSV} type="tertiary" size="small">
            Export<span className="ml-2">📁</span>
          </Button>
        </div>
      </div>
      <div className="ag-theme-balham" style={{ height: 400 }}>
        <AgGridReact
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          autoGroupColumnDef={autoGroupColumnDef}
          onGridReady={onGridReady}
          animateRows={true}
          enableRangeSelection={true}
          suppressMultiRangeSelection={true}
          undoRedoCellEditing={true}
          rowSelection="multiple"
          rowMultiSelectWithClick={true}
          rowData={internalList}
        />
      </div>
      {isLoaderDiplay && <Loader />}
      {messageModalProps && <MessageModal {...messageModalProps} />}
    </>
  );
};
