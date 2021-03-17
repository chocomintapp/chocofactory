import React from "react";
import { Link } from "react-router-dom";

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
        <p className="text-gray-700 text-xl font-medium">NFT Contracts</p>
        <div>
          <Link to="/create-nft-contract">
            <Button type="primary" size="small">
              New<span className="ml-2">✨</span>
            </Button>
          </Link>
        </div>
      </div>
      <div>
        {nftContractList.map((nftContract, i) => {
          return (
            <div key={i} className="mt-4 hover:bg-blue-100 rounded-xl">
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
