import React from "react";
import { RecoilRoot } from "recoil";
import { WalletConnect } from "./WalletConnect";
export default {
  title: "Molecules/WalletConnect",
  component: WalletConnect,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <WalletConnect />
  </RecoilRoot>
);
