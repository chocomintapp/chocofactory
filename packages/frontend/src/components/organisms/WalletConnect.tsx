import React from "react";
import { Link } from "react-router-dom";
import { mainIcon } from "../../configs.json";
import { errorIcon } from "../../configs.json";
import { Button } from "../atoms/Button";
import { useWallet } from "../utils/hooks";
import { useLoadingOverlay, useNotificationToast } from "../utils/hooks";

export const WalletConnect: React.FC = () => {
  const { connectWallet } = useWallet();
  const { openLoadingOverlay, closeLoadingOverlay } = useLoadingOverlay();
  const { openNotificationToast } = useNotificationToast();

  const signIn = async () => {
    try {
      openLoadingOverlay();
      await connectWallet();
      closeLoadingOverlay();
    } catch (err) {
      closeLoadingOverlay();
      openNotificationToast({ type: "error", text: err.message });
    }
  };

  return (
    <section className="fixed inset-0 pointer-events-none">
      <div className="flex p-4 items-center justify-center min-h-full text-center">
        <div className="bg-white shadow border p-6 px-4 transform max-w-lg w-full rounded-md">
          <p className="focus:outline-none absolute left-4 top-2 text-tertiary">{mainIcon}</p>
          <p className="my-8 text-sm text-secondary">Please connect with web3 wallet</p>
          <div className="flex justify-center pointer-events-auto">
            <div className="flex space-x-4">
              <Link to="/">
                <Button type="tertiary">Home</Button>
              </Link>
              <Button type="primary" onClick={signIn}>
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
