import React from "react";

import { useAuth } from "../../modules/auth";
import { getContractsForChainId } from "../../modules/web3";
import { NFTContract, Metadata } from "../../types";

import { Button } from "../atoms/Button";
import { GridList } from "../molecules/GridList";
import { MessageModal, useMessageModal } from "../molecules/MessageModal";
import { NFTCard } from "../molecules/NFTCard";
import { SpreadSheet } from "../molecules/SpreadSheet";

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

  const { messageModalProps, openMessageModal, closeMessageModal } = useMessageModal();
  const { connectWallet } = useAuth();

  React.useEffect(() => {
    setInternalMetadataList(metadataList);
    setDeployedInternal(deployed);
  }, [metadataList, deployed]);

  const deployNFTContract = async () => {
    if (!nftContract) return;
    const { signerAddress, signer } = await connectWallet();
    const signerNetwork = await signer.provider.getNetwork();
    if (nftContract.chainId != signerNetwork.chainId.toString()) return;
    const { chocofactoryContract, chocomoldContract } = getContractsForChainId(nftContract.chainId);
    const data = chocomoldContract.interface.encodeFunctionData("initialize", [
      nftContract.name,
      nftContract.symbol,
      signerAddress,
    ]);
    const predictedDeployResult = await chocofactoryContract.predictDeployResult(
      signerAddress,
      chocomoldContract.address,
      data
    );
    if (predictedDeployResult.toLowerCase() != nftContract.nftContractAddress) return;
    const { hash } = await chocofactoryContract.connect(signer).deploy(chocomoldContract.address, data);
    console.log(hash);
    setDeployedInternal(true);
    openMessageModal("🎉", `NFTs are deployed! \n\n${hash}`, "Close", closeMessageModal, closeMessageModal);
  };

  return nftContract ? (
    <section>
      <div className="flex justify-between mb-4">
        <p className="text-gray-700 text-xl font-bold">NFT Contracts</p>
        <div>
          <Button onClick={deployNFTContract} type="primary" size="small" disabled={deployedInternal}>
            {deployedInternal ? (
              <>
                Deployed<span className="ml-2">✅</span>
              </>
            ) : (
              <>
                Deploy<span className="ml-2">🔧</span>
              </>
            )}
          </Button>
        </div>
      </div>
      <div className="mb-8 relative">
        <NFTCard nftContract={nftContract} />
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-gray-700 text-xl font-bold">NFTs</p>
        <div className="flex">
          <div>
            <Button
              type="tertiary"
              size="small"
              onClick={() => {
                setIsBulkEditMode(!isBulkEditMode);
              }}
            >
              {isBulkEditMode ? "Grid" : "Spread"} <span className="ml-2">👀</span>
            </Button>
          </div>
        </div>
      </div>
      <div>
        {isBulkEditMode ? (
          <SpreadSheet
            setState={setInternalMetadataList}
            nftContract={nftContract}
            metadataList={internalMetadataList}
            mintedTokenIds={mintedTokenIds}
            deployed={deployedInternal}
          />
        ) : (
          <GridList nftContract={nftContract} metadataList={internalMetadataList} />
        )}
      </div>
      {messageModalProps && <MessageModal {...messageModalProps} />}
    </section>
  ) : (
    <></>
  );
};
