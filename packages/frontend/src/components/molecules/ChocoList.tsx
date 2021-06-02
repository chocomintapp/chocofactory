import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import React from "react";
import { Link } from "react-router-dom";
import { analytics } from "../../modules/firebase";
import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContractWithMetadata, Metadata } from "../../types";
import "./ChocoList.scss";

// import { chocopoundContract } from "../../modules/web3";

export interface ChocoListProps {
  nftContractWithMetadataList: NFTContractWithMetadata[];
}

export const ChocoList: React.FC<ChocoListProps> = ({ nftContractWithMetadataList }) => {
  const onClickChoco = () => {
    analytics.logEvent("click", {
      type: "button",
      name: "choco",
    });
  };

  return (
    <section>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {nftContractWithMetadataList &&
          nftContractWithMetadataList.map((choco, i) => {
            return (
              <Link key={i} to={`/nft/`} onClick={onClickChoco}>
                <li className="chocolist-container grab-animation">
                  <div className="chocolist-dummy"></div>
                  <div className="chocolist-element">
                    <img className="absolute h-full w-full object-cover solidity" src={choco.metadata[0].image} />
                    <div className="absolute z-50 top-0 right-0 p-2 m-1 bg-gray-100 text-gray-600 font-bold rounded-full solidity text-xs opacity-75">
                      {getNetworkNameFromChainId(choco.chainId)}
                    </div>
                  </div>
                </li>
              </Link>
            );
          })}
      </ul>
    </section>
  );
};
