import React from "react";
import { Link } from "react-router-dom";

import { Metadata } from "../../types";

export interface GridListProps {
  metadataList: Metadata[];
}

export const GridList: React.FC<GridListProps> = ({ metadataList }) => {
  return (
    <section>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {metadataList.map((metadata, i) => {
          return (
            <Link key={i} to={`/contracts/${metadata.nftContractAddress}/${metadata.tokenId}`}>
              <li className="rounded-xl border overflow-hidden relative">
                <div className="absolute right-0 p-1 px-2 m-1 text-xs bg-gray-900 rounded-full text-white opacity-80">
                  #{metadata.tokenId}
                </div>
                <img className="w-full" src={metadata.image} />
                <div className="p-2">
                  <p className="text-gray-700 text-sm font-bold mb-1">{metadata.name}</p>
                  <p className="text-gray-500 text-xs">{metadata.description}</p>
                </div>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
};
