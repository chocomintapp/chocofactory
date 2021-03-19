import React from "react";
import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract } from "../../types";

export interface NFTCardProps {
  nftContract: NFTContract;
}

export const NFTCard: React.FC<NFTCardProps> = ({ nftContract }) => {
  return (
    <div className="border rounded-md p-4 relative shadow-sm">
      <p className="absolute right-0 top-0 p-4 text-sm text-secondary font-bold">
        {getNetworkNameFromChainId(nftContract.chainId)}
      </p>
      <p className="text-xl font-bold text-secondary">{nftContract.name}</p>
      <p className="text-xs text-tertiary mb-4">{nftContract.symbol}</p>
      <p className="text-sm text-tertiary">{nftContract.nftContractAddress}</p>
    </div>
  );
};
