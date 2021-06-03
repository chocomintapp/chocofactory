import { AgGridReact } from "ag-grid-react";

import React from "react";

import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract } from "../../types";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";

export interface NFTsInfoViewerProps {
  nftContractList: NFTContract[];
}

export const NFTsInfoViewer: React.FC<NFTsInfoViewerProps> = ({ nftContractList }) => {
  const [internalList, setInternalList] = React.useState<any[]>();
  React.useEffect(() => {
    if (!nftContractList) return;
    const result = nftContractList.map((nftContract: any) => {
      nftContract.networkName = getNetworkNameFromChainId(nftContract.chainId);
      return nftContract;
    });
    setInternalList(result);
  }, [nftContractList]);

  const columnDefs = [
    {
      field: "networkName",
    },
    {
      field: "name",
    },
    {
      field: "nftContractAddress",
      width: 500,
    },
  ];
  return (
    <section>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact
          defaultColDef={{ resizable: true }}
          rowData={internalList}
          columnDefs={columnDefs}
          pagination={true}
        />
      </div>
    </section>
  );
};
