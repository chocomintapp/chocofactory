import React from "react";
import { Link } from "react-router-dom";

import { signOutIcon } from "../../configs.json";
import { NFTContract } from "../../types";
import { Button } from "../atoms/Button";
import { NFTCard } from "../molecules/NFTCard";
import { useWallet } from "../utils/hooks";

export interface MypageProps {
  nftContractList: NFTContract[];
}

export const Mypage: React.FC<MypageProps> = ({ nftContractList }) => {
  const { disconnectWallet } = useWallet();

  return (
    <section>
      <div className="flex justify-between mb-4">
        <p className="text-primary text-xl font-bold">NFT Contracts</p>
        <div className="flex">
          <div className="mr-2">
            <Link to="/create-nft-contract">
              <Button type="primary" size="small">
                New<span className="ml-2">✨</span>
              </Button>
            </Link>
          </div>
          <div>
            <Button onClick={disconnectWallet} type="primary" size="small">
              Sign out<span className="ml-2">{signOutIcon}</span>
            </Button>
          </div>
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
