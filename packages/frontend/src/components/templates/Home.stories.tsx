import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { HomeTemplate } from "./Home";

export default {
  title: "Templates/HomeTemplate",
  component: HomeTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <HomeTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
