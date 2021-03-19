import React from "react";

export interface FormProps {
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ children }) => {
  return <form className="space-y-4">{children}</form>;
};
