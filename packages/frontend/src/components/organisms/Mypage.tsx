import React from "react";
import { Link } from "react-router-dom";

import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract } from "../../types";
import { Button } from "../atoms/Button";

import { NFTCard } from "../molecules/NFTCard";

export interface MypageProps {
  nftContractList: NFTContract[];
}

export const Mypage: React.FC<MypageProps> = ({ nftContractList }) => {
  return (
    <section>
      <div className="flex justify-between mb-4">
        <p className="text-gray-700 text-2xl font-medium">NFT Contracts</p>
        <div>
          <Link to="/create-nft-contract">
            <Button type="primary">NEW＋</Button>
          </Link>
        </div>
      </div>
      <div>
        {nftContractList.map((nftContract, i) => {
          return (
            <div key={i} className="mt-4">
              <Link key={i} to={`${nftContract.chainId}/${nftContract.nftContractAddress}`}>
                <NFTCard nftContract={nftContract} />
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};
