import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { AuthGuard, AuthGuardProps } from "./AuthGuard";
const args: AuthGuardProps = {
  children: "Authed Content",
};

export default {
  title: "Organisms/AuthGuard",
  component: AuthGuard,
  args,
};

export const Control: React.FC<AuthGuardProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <AuthGuard {...props}>{props.children}</AuthGuard>
    </MemoryRouter>
  </RecoilRoot>
);
