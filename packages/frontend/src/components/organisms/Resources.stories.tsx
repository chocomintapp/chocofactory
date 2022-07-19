import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Resources } from "./Resources";

export default {
  title: "Organisms/Resources",
  component: Resources,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <Resources {...props}>{props.children}</Resources>
    </MemoryRouter>
  </RecoilRoot>
);
