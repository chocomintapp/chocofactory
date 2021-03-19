import React from "react";

import { Label } from "../atoms/Label";

export interface FormTextAreaProps {
  label: string;
  value: string;
  error?: string;
  readonly?: boolean;
  setState?: (input: any) => void;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ label, value, error, readonly, setState }) => {
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
        readOnly={readonly}
        className="mt-1 p-2 block w-full focus:ring-green-400 focus:border-green-400 text-xs border-gray-300 rounded-md"
      />
      <p className="h-2 text-xs text-xs ml-2 text-red-400">{error}</p>
    </div>
  );
};
