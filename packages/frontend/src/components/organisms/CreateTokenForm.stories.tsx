import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CreateTokenForm } from "./CreateTokenForm";

export default {
  title: "Organisms/CreateTokenForm",
  component: CreateTokenForm,
};

export const Control: React.FC = () => (
  <MemoryRouter>
    <CreateTokenForm />
  </MemoryRouter>
);
