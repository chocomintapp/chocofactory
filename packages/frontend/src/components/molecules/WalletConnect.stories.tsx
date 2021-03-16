import React from "react";
import { RecoilRoot } from "recoil";
import { WalletConnect } from "./WalletConnect";
export default {
  title: "Molecules/WalletConnect",
  component: WalletConnect,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <WalletConnect {...props}>{props.children}</WalletConnect>
  </RecoilRoot>
);
