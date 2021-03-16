import React from "react";
import { RecoilRoot } from "recoil";
import { AuthGuard, AuthGuardProps } from "./AuthGuard";
const args: AuthGuardProps = {
  children: "Authed Content",
};

export default {
  title: "Molecules/AuthGuard",
  component: AuthGuard,
  args,
};

export const Control: React.FC<AuthGuardProps> = (props) => (
  <RecoilRoot>
    <AuthGuard {...props}>{props.children}</AuthGuard>
  </RecoilRoot>
);
