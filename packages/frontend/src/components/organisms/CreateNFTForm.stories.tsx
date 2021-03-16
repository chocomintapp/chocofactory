import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CreateNFTForm } from "./CreateNFTForm";

export default {
  title: "Organisms/CreateNFTForm",
  component: CreateNFTForm,
};

export const Control: React.FC = () => (
  <MemoryRouter>
    <CreateNFTForm />
  </MemoryRouter>
);
