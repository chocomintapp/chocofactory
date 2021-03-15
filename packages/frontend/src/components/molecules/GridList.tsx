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
            <Link key={i} to={`/${metadataList}/${metadata.tokenId}`}>
              <li className="rounded-xl overflow-hidden shadow-md">
                <img className="w-full" src={metadata.image} />
                <div className="p-2">
                  <div className="text-gray-700 text-sm font-bold mb-1">{metadata.name}</div>
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
