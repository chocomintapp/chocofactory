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
          <button
            className="mb-4 focus:outline-none p-1 px-2 text-xs bg-green-400 rounded-md text-white"
            onClick={() => {
              console.log("deploy");
            }}
          >
            Deploy
          </button>
        </div>
      </div>
      <div className="mb-8 relative">
        <NFTCard nftContract={nftContract} />
      </div>
      <div className="flex justify-between mb-4">
        <p className="text-gray-700 text-xl font-medium">NFTs</p>
        <div className="flex">
          <div>
            <button
              className="focus:outline-none p-1 px-2 text-xs border rounded-md text-gray-600"
              onClick={() => {
                setIsBulkEditMode(!isBulkEditMode);
              }}
            >
              {isBulkEditMode ? "Grid View" : "Spread View"}
            </button>
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
