import React from "react";
import { name, mainIcon } from "../../configs.json";
import { useAuth } from "../../modules/auth";

import { Button } from "../atoms/Button";
import { Modal } from "../atoms/Modal";

export const WalletConnect: React.FC = () => {
  const { connectWallet } = useAuth();
  return (
    <section>
      <Modal icon={mainIcon}>
        <p className="my-8 text-sm font-medium  text-gray-600">Please connect web3 wallet</p>
        <Button type="primary" onClick={connectWallet}>
          Connect
        </Button>
      </Modal>
    </section>
  );
};
