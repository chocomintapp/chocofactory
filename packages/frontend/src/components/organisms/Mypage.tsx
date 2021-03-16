import React from "react";
import { Link } from "react-router-dom";

import { NFTContract } from "../../types";
import { Button } from "../atoms/Button";

export interface MypageProps {
  nftContractList: NFTContract[];
}

export const Mypage: React.FC<MypageProps> = ({ nftContractList }) => {
  return (
    <section>
      <Link to="/create-contract">
        <Button type="primary">Create Contract</Button>{" "}
      </Link>
      <ul>
        {nftContractList.map((nftContract, i) => {
          return (
            <Link key={i} to={`contracts/${nftContract}`}>
              <li>
                <p>{nftContract.name}</p>
                <p>{nftContract.symbol}</p>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};
