import React from "react";
import { userWallet } from "../utils/hooks";
import { WalletConnect } from "./WalletConnect";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { userAddress } = userWallet();
  return <>{userAddress ? children : <WalletConnect />}</>;
};
