import React from "react";
import { useRecoilState } from "recoil";
import { initializeWeb3Modal, web3Modal, selectedAddressState } from "../../modules/web3";

import { Button } from "../atoms/Button";

export const WalletConnect: React.FC = () => {
  const [, setSelectedAddress] = useRecoilState(selectedAddressState);

  const connectWallet = async () => {
    const provider = await initializeWeb3Modal();
    setSelectedAddress(provider.selectedAddress);
  };

  React.useEffect(() => {
    if (web3Modal.cachedProvider) {
      connectWallet();
    }
  }, []);

  return (
    <section>
      <Button type="primary" onClick={connectWallet}>
        Connect Wallet
      </Button>
    </section>
  );
};
