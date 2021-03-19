import React from "react";
import { useAuth } from "../utils/hooks";
import { WalletConnect } from "./WalletConnect";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { userAddress } = useAuth();
  return <>{userAddress ? children : <WalletConnect />}</>;
};
