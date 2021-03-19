import React from "react";
import { useWallet } from "../utils/hooks";
import { WalletConnect } from "./WalletConnect";

export interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const { userAddress } = useWallet();
  return <>{userAddress ? children : <WalletConnect />}</>;
};
