import React from "react";
import { Link } from "react-router-dom";

import { useRecoilState } from "recoil";

import { name, mainIcon, personIcon } from "../../configs.json";
import { shortenAddress } from "../../modules/util";
import { initializeWeb3Modal, web3Modal, selectedAddressState } from "../../modules/web3";

import { Button } from "../atoms/Button";

export const Header: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useRecoilState(selectedAddressState);

  const connectWallet = async () => {
    const provider = await initializeWeb3Modal();
    setSelectedAddress(provider.selectedAddress);
  };

  React.useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return (
    <header>
      <div className="relative h-14">
        <Link to="/">
          <div className="px-4 py-4 absolute left-0 font-bold">
            {name} {mainIcon}
          </div>
        </Link>
        <div className="px-4 py-2 absolute right-0">
          {!selectedAddress ? (
            <Button onClick={connectWallet} type="tertiary">
              Connect<span className="ml-2">🔌</span>
            </Button>
          ) : (
            <Link to={`/creator/${selectedAddress}`}>
              <Button type="tertiary">
                {shortenAddress(selectedAddress)}
                <span className="ml-2">{personIcon}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
