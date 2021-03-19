import React from "react";
import { errorIcon, confirmIcon, viewIcon, explorerIcon, checkedIcon, deployIcon } from "../../configs.json";
import { getContractsForChainId, getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract, Metadata } from "../../types";

import { Button } from "../atoms/Button";
import { NFTCard } from "../molecules/NFTCard";
import { useWallet } from "../utils/hooks";
import { useLoadingOverlay, useMessageModal, useNotificationToast } from "../utils/hooks";
import { NFTsGridListViewer } from "./NFTsGridListViewer";

import { NFTsSpreadSheetViewer } from "./NFTsSpreadSheetViewer";

export interface ContractProps {
  nftContract?: NFTContract;
  metadataList: Metadata[];
  deployed: boolean;
  mintedTokenIds: string[];
}

export const Contract: React.FC<ContractProps> = ({ nftContract, metadataList, deployed, mintedTokenIds }) => {
  const [isBulkEditMode, setIsBulkEditMode] = React.useState(true);
  const [internalMetadataList, setInternalMetadataList] = React.useState<Metadata[]>([]);
  const [deployedInternal, setDeployedInternal] = React.useState(false);

  const { openMessageModal, closeMessageModal } = useMessageModal();
  const { openNotificationToast } = useNotificationToast();
  const { connectWallet } = useWallet();

  const { openLoadingOverlay, closeLoadingOverlay } = useLoadingOverlay();

  React.useEffect(() => {
    setInternalMetadataList(metadataList);
    setDeployedInternal(deployed);
  }, [metadataList, deployed]);

  const openAddressExplore = (chainId: string, address: string) => {
    const { explore } = getContractsForChainId(chainId);
    window.open(`${explore}address/${address}`);
  };

  const deployNFTContract = async () => {
    if (!nftContract) return;
    const { signerAddress, signer } = await connectWallet();
    const signerNetwork = await signer.provider.getNetwork();
    if (nftContract.chainId != signerNetwork.chainId.toString()) {
      const networkName = getNetworkNameFromChainId(nftContract.chainId);
      openNotificationToast({ type: "error", text: `Please connect ${networkName} network` });
      return;
    }
    openLoadingOverlay();
    try {
      const { chocofactoryContract, chocomoldContract, explore } = getContractsForChainId(nftContract.chainId);
      const predictedDeployResult = await chocofactoryContract.predictDeployResult(
        chocomoldContract.address,
        signerAddress,
        nftContract.name,
        nftContract.symbol
      );
      if (predictedDeployResult.toLowerCase() != nftContract.nftContractAddress) return;
      const { hash } = await chocofactoryContract
        .connect(signer)
        .deployWithTypedSig(
          chocomoldContract.address,
          nftContract.ownerAddress,
          nftContract.name,
          nftContract.symbol,
          nftContract.signature
        );
      setDeployedInternal(true);
      closeLoadingOverlay();
      openMessageModal({
        icon: confirmIcon,
        messageText: "Transaction submitted!",
        buttonText: "Check",
        onClickConfirm: () => window.open(`${explore}tx/${hash}`),
        onClickDismiss: closeMessageModal,
      });
    } catch (err) {
      closeLoadingOverlay();
      openNotificationToast({ type: "error", text: err.message });
    }
  };

  return nftContract ? (
    <section>
      <div className="flex justify-between mb-4">
        <p className="text-primary text-xl font-bold">NFT Contract</p>
        <div>
          <Button onClick={deployNFTContract} type="primary" size="small" disabled={deployedInternal}>
            {deployedInternal ? (
              <>
                Deployed<span className="ml-2">{checkedIcon}</span>
              </>
            ) : (
              <>
                Deploy<span className="ml-2">{deployIcon}</span>
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="mb-8 relative">
        <NFTCard nftContract={nftContract} />
        <p className="text-xs mt-1 text-right text-blue-400 font-bold underline">
          <span
            onClick={() => openAddressExplore(nftContract.chainId, nftContract.nftContractAddress)}
            className="cursor-pointer "
          >
            Open Block Explore {explorerIcon}
          </span>
        </p>
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-primary text-xl font-bold">NFTs</p>
        <div>
          <Button
            type="tertiary"
            size="small"
            onClick={() => {
              setIsBulkEditMode(!isBulkEditMode);
            }}
          >
            {isBulkEditMode ? "Grid" : "Spread"} <span className="ml-2">{viewIcon}</span>
          </Button>
        </div>
      </div>
      <div>
        {isBulkEditMode ? (
          <NFTsSpreadSheetViewer
            setState={setInternalMetadataList}
            nftContract={nftContract}
            metadataList={internalMetadataList}
            mintedTokenIds={mintedTokenIds}
            deployed={deployedInternal}
          />
        ) : (
          <NFTsGridListViewer nftContract={nftContract} metadataList={internalMetadataList} />
        )}
      </div>
    </section>
  ) : (
    <></>
  );
};
