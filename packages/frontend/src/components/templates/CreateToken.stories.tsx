import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { CreateTokenTemplate } from "./CreateToken";

export default {
  title: "Templates/CreateTokenTemplate",
  component: CreateTokenTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <CreateTokenTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
