import React from "react";
import { Link } from "react-router-dom";

import { fancyIcon } from "../../configs.json";
import { getFileType, shortenText } from "../../modules/util";
import { NFTContract, Metadata } from "../../types";
import { Button } from "../atoms/Button";

import "./NFTsGridListViewer.scss";

export interface NFTsGridListViewerProps {
  nftContract: NFTContract;
  metadataList: Metadata[];
}

export const NFTsGridListViewer: React.FC<NFTsGridListViewerProps> = ({ nftContract, metadataList }) => {
  return (
    <section>
      <div className="mb-2 flex justify-start">
        <div>
          <Link to={`/${nftContract.chainId}/${nftContract.nftContractAddress}/${metadataList.length + 1}`}>
            <Button type="primary" size="small">
              New<span className="ml-2">{fancyIcon}</span>
            </Button>
          </Link>
        </div>
      </div>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {metadataList.map((metadata, i) => {
          const imageType = getFileType(metadata.image);
          return (
            <Link key={i} to={`/${metadata.chainId}/${metadata.nftContractAddress}/${metadata.tokenId}`}>
              <li className="gridlist-container rounded-md border overflow-hidden relative shadow-sm">
                <div className="gridlist-dummy"></div>
                <div className="gridlist-element">
                  {imageType == "mp4" ? (
                    <video className="absolute h-full w-full object-cover" controls>
                      <source src={metadata.image} type="video/mp4" />
                    </video>
                  ) : imageType == "png" || imageType == "jpg" || imageType == "jpeg" || imageType == "gif" ? (
                    <img className="absolute h-full w-full object-cover" src={metadata.image} />
                  ) : (
                    <></>
                  )}
                  <div className="absolute right-0 p-1 px-2 m-1 text-xs bg-gray-900 rounded-full text-white opacity-75">
                    #{metadata.tokenId}
                  </div>
                  {metadata.name && metadata.description && (
                    <div className="absolute z-50 p-2 bg-gray-900 w-full bottom-0 opacity-75">
                      <p className="text-white text-sm font-bold mb-1">{shortenText(metadata.name, 10)}</p>
                      <p className="text-white text-xs">{shortenText(metadata.description, 40)}</p>
                    </div>
                  )}
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};
