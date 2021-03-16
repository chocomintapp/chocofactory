import React from "react";
import { useAuth } from "../../modules/auth";

import { Button } from "../atoms/Button";

export const WalletConnect: React.FC = () => {
  const { connectWallet } = useAuth();
  return (
    <section>
      <Button type="primary" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </section>
  );
};
