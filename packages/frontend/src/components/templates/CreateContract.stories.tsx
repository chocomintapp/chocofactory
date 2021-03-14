import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CreateContractTemplate } from "./CreateContract";

export default {
  title: "Templates/CreateContractTemplate",
  component: CreateContractTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <CreateContractTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
