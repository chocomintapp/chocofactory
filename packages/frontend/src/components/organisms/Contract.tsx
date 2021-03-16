import React from "react";
import { Link } from "react-router-dom";

import { NFTContract, Metadata } from "../../types";

import { Button } from "../atoms/Button";
import { GridList } from "../molecules/GridList";
import { NFTCard } from "../molecules/NFTCard";
import { SpreadSheet } from "../molecules/SpreadSheet";

export interface ContractProps {
  nftContract?: NFTContract;
  metadataList: Metadata[];
}

export const Contract: React.FC<ContractProps> = ({ nftContract, metadataList }) => {
  const [isBulkEditMode, setIsBulkEditMode] = React.useState(false);

  return nftContract ? (
    <section>
      <div className="mb-8">
        <NFTCard nftContract={nftContract} />
      </div>
      <Link to={`/contracts/${nftContract.nftContractAddress}/create-nft`}>
        <Button type="primary">Add</Button>
      </Link>
      <Button
        onClick={() => {
          setIsBulkEditMode(!isBulkEditMode);
        }}
        type="primary"
      >
        Bulk Update
      </Button>
      <div>
        {isBulkEditMode ? <SpreadSheet metadataList={metadataList} /> : <GridList metadataList={metadataList} />}
      </div>
    </section>
  ) : (
    <></>
  );
};
