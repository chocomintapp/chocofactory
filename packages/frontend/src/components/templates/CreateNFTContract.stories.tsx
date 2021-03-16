import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CreateNFTContractTemplate } from "./CreateNFTContract";

export default {
  title: "Templates/CreateNFTContractTemplate",
  component: CreateNFTContractTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <CreateNFTContractTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
