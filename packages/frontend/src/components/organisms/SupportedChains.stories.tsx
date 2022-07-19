import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { SupportedChains } from "./SupportedChains";

export default {
  title: "Organisms/SupportedChains",
  component: SupportedChains,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <SupportedChains {...props}>{props.children}</SupportedChains>
    </MemoryRouter>
  </RecoilRoot>
);
