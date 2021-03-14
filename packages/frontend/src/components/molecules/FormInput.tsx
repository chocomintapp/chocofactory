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
        className="mt-1 block w-full focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-xl"
      />
    </div>
  );
};
