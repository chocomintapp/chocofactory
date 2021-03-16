import React from "react";
import { Link } from "react-router-dom";

import { NFTContract, Metadata } from "../../types";

import { Button } from "../atoms/Button";
import { GridList } from "../molecules/GridList";

export interface ContractDetailProps {
  nftContract: NFTContract;
  metadataList: Metadata[];
}

export const ContractDetail: React.FC<ContractDetailProps> = ({ nftContract, metadataList }) => {
  return (
    <section>
      <div>
        <h3>{nftContract.nftContractAddress}</h3>
        <p>{nftContract.name}</p>
        <p>{nftContract.symbol}</p>
      </div>
      <Link to={`contracts/${nftContract.nftContractAddress}/create-nft`}>
        <Button type="primary">Add</Button>
      </Link>
      <div>
        <GridList metadataList={metadataList} />
      </div>
    </section>
  );
};
