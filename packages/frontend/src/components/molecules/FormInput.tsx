import React from "react";

import { Label } from "../atoms/Label";

export interface FormInputProps {
  type: "text" | "number";
  label: string;
  onChange: () => void;
}

export const FormInput: React.FC<FormInputProps> = ({ type, label, onChange }) => {
  return (
    <div>
      <Label text={label} />
      <input
        onChange={onChange}
        type={type}
        className="mt-1 block w-full focus:ring-green-400 focus:border-green-400 text-xs border-gray-300 rounded-xl shadow-sm"
      />
    </div>
  );
};
