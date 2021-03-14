import React from "react";

export interface MainProps {
  children: React.ReactNode;
}

export const Main: React.FC<MainProps> = ({ children }) => {
  return <div className="flex flex-col min-h-screen">{children}</div>;
};
