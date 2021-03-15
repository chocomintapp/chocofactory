import React from "react";
import { Label } from "../atoms/Label";

import { ImageUpload } from "./ImageUpload";

export interface FormImageUploadProps {
  label: string;
  status: "normal" | "isImageLoading" | "isWaitingTransactionConfirmation";
  imagePreview: string;
  onChange: () => void;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({ label, status, imagePreview, onChange }) => {
  return (
    <div>
      <Label text={label} />
      <ImageUpload status={status} imagePreview={imagePreview} onChange={onChange} />
    </div>
  );
};
