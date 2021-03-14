import React from "react";

export interface LabelProps {
  text: string;
}

export const Label: React.FC<LabelProps> = ({ text }) => {
  return (
    <label htmlFor="cover_photo" className="block text-sm font-bold text-gray-600">
      {text}
    </label>
  );
};
