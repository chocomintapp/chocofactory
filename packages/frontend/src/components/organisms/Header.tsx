import React from "react";
import { Link } from "react-router-dom";

import { name, mainIcon, personIcon } from "../../configs.json";
import { shortenAddress } from "../../modules/util";

import { Button } from "../atoms/Button";
import { userWallet } from "../utils/hooks";

export const Header: React.FC = () => {
  const { connectWallet, userAddress } = userWallet();

  return (
    <header>
      <div className="relative h-20">
        <Link to="/">
          <div className="px-4 py-8 absolute left-0 font-bold">
            {name}
            <span className="ml-1">{mainIcon}</span>
          </div>
        </Link>
        <div className="px-2 py-6 absolute right-0">
          {!userAddress ? (
            <Button onClick={connectWallet} type="tertiary">
              Connect<span className="ml-2">🔌</span>
            </Button>
          ) : (
            <Link to="/mypage">
              <Button type="tertiary">
                {shortenAddress(userAddress)}
                <span className="ml-2">{personIcon}</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
