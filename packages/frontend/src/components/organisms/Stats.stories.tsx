import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Stats } from "./Stats";

export default {
  title: "Organisms/Stats",
  component: Stats,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <Stats {...props}>{props.children}</Stats>
    </MemoryRouter>
  </RecoilRoot>
);
