import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CreateContractForm } from "./CreateContractForm";

export default {
  title: "Organisms/CreateContractForm",
  component: CreateContractForm,
};

export const Control: React.FC = () => (
  <MemoryRouter>
    <CreateContractForm />
  </MemoryRouter>
);
