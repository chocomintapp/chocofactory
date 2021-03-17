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
        <p className="my-8 text-sm font-medium text-gray-600">Please connect wallet for access here</p>
        <div className="flex justify-center">
          <div className="w-6/12">
            <Button type="primary" onClick={connectWallet}>
              Connect
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};
