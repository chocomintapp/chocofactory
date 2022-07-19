import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ChocoV2 } from "./ChocoV2";

export default {
  title: "Organisms/ChocoV2",
  component: ChocoV2,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <ChocoV2 {...props}>{props.children}</ChocoV2>
    </MemoryRouter>
  </RecoilRoot>
);
