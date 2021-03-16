import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CreateContractForm } from "./CreateContractForm";
export default {
  title: "Organisms/CreateContractForm",
  component: CreateContractForm,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <CreateContractForm />
    </MemoryRouter>
  </RecoilRoot>
);
