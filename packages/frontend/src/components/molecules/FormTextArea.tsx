import React from "react";

import { Label } from "../atoms/Label";

export interface FormTextAreaProps {
  label: string;
  onChange: () => void;
}

export const FormTextArea: React.FC<FormTextAreaProps> = ({ label, onChange }) => {
  return (
    <div>
      <Label text={label} />
      <textarea
        onChange={onChange}
        className="mt-1 block w-full focus:ring-green-500 focus:border-green-500 sm:text-sm border-gray-300 rounded-xl"
      />
    </div>
  );
};
