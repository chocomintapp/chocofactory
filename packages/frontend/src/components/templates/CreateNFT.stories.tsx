import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CreateNFTTemplate } from "./CreateNFT";

export default {
  title: "Templates/CreateNFTTemplate",
  component: CreateNFTTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <CreateNFTTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
