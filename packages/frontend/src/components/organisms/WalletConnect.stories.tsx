import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { WalletConnect } from "./WalletConnect";
export default {
  title: "Organisms/WalletConnect",
  component: WalletConnect,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <WalletConnect {...props}>{props.children}</WalletConnect>
    </MemoryRouter>
  </RecoilRoot>
);
