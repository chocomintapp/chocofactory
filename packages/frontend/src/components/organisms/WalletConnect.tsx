import React from "react";
import { Link } from "react-router-dom";
import { mainIcon } from "../../configs.json";
import { Button } from "../atoms/Button";
import { userWallet } from "../utils/hooks";
import { useLoadingOverlay, useMessageModal } from "../utils/hooks";

export const WalletConnect: React.FC = () => {
  const { connectWallet } = userWallet();
  const { openLoadingOverlay, closeLoadingOverlay } = useLoadingOverlay();

  const signIn = async () => {
    try {
      openLoadingOverlay();
      await connectWallet();
      closeLoadingOverlay();
    } catch (err) {
      closeLoadingOverlay();
      console.log("chatc", err);
    }
  };

  return (
    <section className="fixed inset-0">
      <div className="flex p-4 items-center justify-center min-h-full text-center">
        <div className="bg-white border p-6 px-4 transform max-w-lg w-full rounded-xl">
          <p className="focus:outline-none absolute left-4 top-2 text-gray-400">{mainIcon}</p>
          <p className="my-8 text-gray-600">Please connect with web3 wallet</p>
          <div className="flex justify-center">
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
