import React from "react";
import { MemoryRouter } from "react-router-dom";
import { CreateNFTForm } from "./CreateNFTForm";

export default {
  title: "Organisms/CreateNFTForm",
  component: CreateNFTForm,
};

export const Control: React.FC = (props) => (
  <MemoryRouter>
    <CreateNFTForm {...props}>{props.children}</CreateNFTForm>
  </MemoryRouter>
);
