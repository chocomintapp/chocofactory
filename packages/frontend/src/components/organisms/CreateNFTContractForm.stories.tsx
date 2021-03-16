import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CreateNFTContractForm } from "./CreateNFTContractForm";
export default {
  title: "Organisms/CreateNFTContractForm",
  component: CreateNFTContractForm,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <CreateNFTContractForm {...props}>{props.children}</CreateNFTContractForm>
    </MemoryRouter>
  </RecoilRoot>
);
