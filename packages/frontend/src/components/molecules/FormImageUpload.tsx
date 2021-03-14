import React from "react";

import { ImageUploadIcon } from "../atoms/ImageUploadIcon";
import { Label } from "../atoms/Label";

export interface FormImageUploadProps {
  label: "label";
  status: "normal" | "isImageLoading" | "isWaitingTransactionConfirmation";
  imagePreview: string;
  onChange: () => void;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({ label, status, imagePreview, onChange }) => {
  const clickInputFile = () => {
    document.getElementById("file")!.click();
  };

  return (
    <div id="dropContainer">
      <Label text={label} />
      <div className="mt-1 flex justify-center p-8 border-2 border-gray-300 border-dashed rounded-xl">
        <div className={"cursor-pointer"} onClick={clickInputFile}>
          <div
            className={
              status == "isImageLoading"
                ? "animate-bounce"
                : status == "isWaitingTransactionConfirmation"
                ? "animate-bounce opacity-50"
                : ""
            }
          >
            {!imagePreview ? (
              <ImageUploadIcon />
            ) : (
              <img className="object-cover mx-auto h-20 w-20 solidity" src={imagePreview} />
            )}
          </div>
          <input onChange={onChange} id="file" type="file" accept="image/*" className="sr-only" />
        </div>
      </div>
    </div>
  );
};
