import React from "react";
import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract } from "../../types";

export interface NFTCardProps {
  nftContract: NFTContract;
}

export const NFTCard: React.FC<NFTCardProps> = ({ nftContract }) => {
  return (
    <div className="border rounded-xl p-4 relative">
      <p className="absolute right-0 py-1 px-2 mx-2 text-xs font-medium text-gray-700">
        {getNetworkNameFromChainId(nftContract.chainId)}
      </p>
      <p className="text-xl font-medium text-gray-700">{nftContract.name}</p>
      <p className="text-xs text-gray-400 mb-4">{nftContract.symbol}</p>
      <p className="text-xs font-medium text-gray-400">{nftContract.nftContractAddress}</p>
    </div>
  );
};
