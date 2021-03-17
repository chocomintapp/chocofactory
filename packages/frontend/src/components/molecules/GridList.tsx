import React from "react";
import { Link } from "react-router-dom";

import { Metadata } from "../../types";
import { ImageUploadIcon } from "../atoms/ImageUploadIcon";

import "./GridList.scss";

export interface GridListProps {
  metadataList: Metadata[];
}

export const GridList: React.FC<GridListProps> = ({ metadataList }) => {
  return (
    <section>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {metadataList.map((metadata, i) => {
          return (
            <Link key={i} to={`/${metadata.chainId}/${metadata.nftContractAddress}/${metadata.tokenId}`}>
              <li className="gridlist-container rounded-xl border overflow-hidden relative">
                <div className="gridlist-dummy"></div>
                <div className="gridlist-element">
                  {metadata.image && <img className="absolute h-full w-full object-cover" src={metadata.image} />}
                  <div className="absolute right-0 p-1 px-2 m-1 text-xs bg-gray-900 rounded-full text-white opacity-75">
                    #{metadata.tokenId}
                  </div>
                  {metadata.name && metadata.description && (
                    <div className="absolute z-50 p-2 bg-gray-900 w-full bottom-0 opacity-75">
                      <p className="text-white text-sm font-bold mb-1">{metadata.name}</p>
                      <p className="text-white text-xs">{metadata.description}</p>
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
