import React from "react";

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
  const [internalMetadataList, setInternalMetadataList] = React.useState<Metadata[]>([]);

  React.useEffect(() => {
    setInternalMetadataList(metadataList);
  }, [metadataList]);

  return nftContract ? (
    <section>
      <div className="flex justify-between mb-4">
        <p className="text-gray-700 text-xl font-medium">NFT Contracts</p>
        <div>
          <Button type="primary" size="small">
            Deploy<span className="ml-2">🔧</span>
          </Button>
        </div>
      </div>
      <div className="mb-8 relative">
        <NFTCard nftContract={nftContract} />
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-gray-700 text-xl font-medium">NFTs</p>
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
          />
        ) : (
          <GridList nftContract={nftContract} metadataList={internalMetadataList} />
        )}
      </div>
    </section>
  ) : (
    <></>
  );
};
