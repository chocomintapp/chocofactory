import React from "react";
import { Link } from "react-router-dom";

import { name, mainIcon, personIcon } from "../../configs.json";
import { useAuth } from "../../modules/auth";
import { shortenAddress } from "../../modules/util";

import { Button } from "../atoms/Button";

export const Header: React.FC = () => {
  const { connectWallet, signerAddressState } = useAuth();

  return (
    <header>
      <div className="relative h-20">
        <Link to="/">
          <div className="px-4 py-8 absolute left-0 font-medium">
            {name} {mainIcon}
          </div>
        </Link>
        <div className="px-4 py-6 absolute right-0">
          {!signerAddressState ? (
            <Button onClick={connectWallet} type="tertiary">
              Connect<span className="ml-2">🔌</span>
            </Button>
          ) : (
            <Link to="/mypage">
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
