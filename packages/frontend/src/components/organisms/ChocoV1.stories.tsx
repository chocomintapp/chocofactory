import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ChocoV1 } from "./ChocoV1";

export default {
  title: "Organisms/ChocoV1",
  component: ChocoV1,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <ChocoV1 {...props}>{props.children}</ChocoV1>
    </MemoryRouter>
  </RecoilRoot>
);
