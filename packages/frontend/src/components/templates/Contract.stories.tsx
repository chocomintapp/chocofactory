import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ContractTemplate } from "./Contract";

export default {
  title: "Templates/ContractTemplate",
  component: ContractTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <ContractTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
