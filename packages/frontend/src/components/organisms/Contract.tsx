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
      <div className="flex justify-between mb-4">
        <p className="text-gray-700 text-2xl font-medium">NFT Contracts</p>
        <div>
          <Button
            onClick={() => {
              console.log("deploy");
            }}
            type="primary"
          >
            DEPLOY
          </Button>
        </div>
      </div>
      <div className="mb-8 relative">
        <NFTCard nftContract={nftContract} />
      </div>
      <div className="flex justify-between mb-8">
        <p className="text-gray-700 text-2xl font-medium">NFTs</p>
        <div className="flex">
          <div className="mr-4">
            <Button
              onClick={() => {
                setIsBulkEditMode(!isBulkEditMode);
              }}
              type="primary"
            >
              MINT
            </Button>
          </div>
          <div>
            <Link to={`/contracts/${nftContract.nftContractAddress}/create-nft`}>
              <Button type="primary">NEW＋</Button>
            </Link>
          </div>
        </div>
      </div>

      <div>
        <GridList metadataList={metadataList} />
      </div>
    </section>
  ) : (
    <></>
  );
};
