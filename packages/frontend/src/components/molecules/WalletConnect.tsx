import React from "react";
import { Link } from "react-router-dom";
import { mainIcon } from "../../configs.json";
import { useAuth } from "../../modules/auth";
import { Button } from "../atoms/Button";

export const WalletConnect: React.FC = () => {
  const { connectWallet } = useAuth();
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
              <Button type="primary" onClick={connectWallet}>
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
