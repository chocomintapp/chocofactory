import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Top } from "./Top";

export default {
  title: "Organisms/Top",
  component: Top,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <Top {...props}>{props.children}</Top>
    </MemoryRouter>
  </RecoilRoot>
);
