import React from "react";
import { useAuth } from "../../modules/auth";
import { WalletConnect } from "../molecules/WalletConnect";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { signerAddress } = useAuth();
  return <>{signerAddress ? children : <WalletConnect />}</>;
};
