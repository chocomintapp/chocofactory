import React from "react";
import { MemoryRouter } from "react-router-dom";
import { ContractDetail } from "./ContractDetail";

export default {
  title: "Organisms/ContractDetail",
  component: ContractDetail,
};

export const Control: React.FC = () => (
  <MemoryRouter>
    <ContractDetail />
  </MemoryRouter>
);
