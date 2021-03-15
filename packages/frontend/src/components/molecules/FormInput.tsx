import React from "react";

import { Label } from "../atoms/Label";

export interface FormInputProps {
  type: "text" | "number";
  label: string;
  setState: (input: any) => void;
}

export const FormInput: React.FC<FormInputProps> = ({ type, label, setState }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState(event.target.value);
  };

  return (
    <div>
      <Label text={label} />
      <input
        onChange={handleChange}
        type={type}
        className="mt-1 block w-full focus:ring-green-400 focus:border-green-400 text-xs border-gray-300 rounded-xl shadow-sm"
      />
    </div>
  );
};
