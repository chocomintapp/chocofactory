import React from "react";

import { Label } from "../atoms/Label";

export interface FormInputProps {
  type: "text" | "number";
  label: string;
  value: string | number;
  readonly?: boolean;
  setState?: (input: any) => void;
}

export const FormInput: React.FC<FormInputProps> = ({ type, value, label, readonly, setState }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!setState) return;
    setState(event.target.value);
  };

  return (
    <div>
      <Label text={label} />
      <input
        onChange={handleChange}
        value={value}
        type={type}
        readOnly={readonly}
        className="mt-1 p-2 block w-full focus:ring-green-400 focus:border-green-400 text-xs border-gray-300 rounded-xl"
      />
    </div>
  );
};
