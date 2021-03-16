import React from "react";
import { Link } from "react-router-dom";

import { name, mainIcon, personIcon } from "../../configs.json";
import { useAuth } from "../../modules/auth";
import { shortenAddress } from "../../modules/util";
import { web3Modal } from "../../modules/web3";

import { Button } from "../atoms/Button";

export const Header: React.FC = () => {
  const { connectWallet, signerAddressState } = useAuth();

  React.useEffect(() => {
    if (web3Modal.cachedProvider) {
      // connectWallet();
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
          {!signerAddressState ? (
            <Button onClick={connectWallet} type="tertiary">
              Connect<span className="ml-2">🔌</span>
            </Button>
          ) : (
            <Link to={`/creator/${signerAddressState}`}>
              <Button type="tertiary">
                {shortenAddress(signerAddressState)}
                <span className="ml-2">{personIcon}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
