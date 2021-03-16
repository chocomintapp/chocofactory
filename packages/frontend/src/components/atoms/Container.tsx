import React from "react";

export interface ContainerProps {
  type?: "wide" | "medium" | "narrow";
  children: React.ReactNode;
}

export const Container: React.FC<ContainerProps> = ({ children, type }) => {
  return !type || type == "wide" ? (
    <div className={"container mx-auto flex-grow w-11/12 max-w-5xl py-6"}>{children}</div>
  ) : type == "medium" ? (
    <div className={"container mx-auto flex-grow w-11/12 max-w-3xl py-6"}>{children}</div>
  ) : (
    <div className={"container mx-auto flex-grow w-11/12 max-w-xl py-6"}>{children}</div>
  );
};
