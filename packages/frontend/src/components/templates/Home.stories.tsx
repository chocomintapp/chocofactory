import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { HomeTemplate } from "./Home";

export default {
  title: "Templates/HomeTemplate",
  component: HomeTemplate,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <HomeTemplate {...props}>{props.children}</HomeTemplate>
    </MemoryRouter>
  </RecoilRoot>
);
