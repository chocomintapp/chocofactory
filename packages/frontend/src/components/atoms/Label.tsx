import React from "react";

export interface LabelProps {
  text: string;
}

export const Label: React.FC<LabelProps> = ({ text }) => {
  return <label className="block text-xs font-bold text-secondary">{text}</label>;
};
