import React from "react";

export interface ContainerProps {
  type?: "wide" | "narrow";
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, type }) => {
  return !type || type == "wide" ? (
    <div className={"container mx-auto flex-grow w-11/12 max-w-4xl py-6"}>{children}</div>
  ) : (
    <div className={"container mx-auto flex-grow w-11/12 max-w-md py-6"}>{children}</div>
  );
};
