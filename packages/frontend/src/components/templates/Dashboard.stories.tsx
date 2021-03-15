import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { DashboardTemplate } from "./Dashboard";

export default {
  title: "Templates/Dashboard",
  component: DashboardTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <DashboardTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
