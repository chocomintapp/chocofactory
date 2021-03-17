import React from "react";
import { mainIcon } from "../../configs.json";
import { useAuth } from "../../modules/auth";

import { Button } from "../atoms/Button";
import { Modal } from "../atoms/Modal";

export const WalletConnect: React.FC = () => {
  const { connectWallet } = useAuth();
  return (
    <section>
      <Modal icon={mainIcon}>
        <p className="my-4 text-sm text-gray-400">Please connect wallet for access here</p>
        <Button type="primary" onClick={connectWallet}>
          Connect
        </Button>
      </Modal>
    </section>
  );
};
