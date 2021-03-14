import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CreateTemplate } from "./Create";

export default {
  title: "Templates/CreateTemplate",
  component: CreateTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <CreateTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
