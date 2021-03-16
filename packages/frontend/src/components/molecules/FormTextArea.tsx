import React from "react";

import { Label } from "../atoms/Label";

export interface FormTextAreaProps {
  label: string;
  value: string;
  setState?: (input: any) => void;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ label, value, setState }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!setState) return;
    setState(event.target.value);
  };

  return (
    <div>
      <Label text={label} />
      <textarea
        onChange={handleChange}
        value={value}
        className="mt-1 block w-full focus:ring-green-400 focus:border-green-400 text-xs border-gray-300 rounded-xl shadow-sm"
      />
    </div>
  );
};
