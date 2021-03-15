import React from "react";
import { ImageUploadIcon } from "../atoms/ImageUploadIcon";
import { Label } from "../atoms/Label";

export interface FormImageUploadProps {
  label: string;
  status: "normal" | "isImageLoading" | "isWaitingTransactionConfirmation";
  imagePreview: string;
  onChange: () => void;
}

export const FormImageUpload: React.FC<FormImageUploadProps> = ({ label, status, imagePreview, onChange }) => {
  const clickInputFile = () => {
    document.getElementById("file")!.click();
  };

  return (
    <div>
      <Label text={label} />
      <div id="dropContainer h-full">
        <div className="mt-1 h-full flex justify-center p-8 border border-gray-300 border-dashed rounded-xl shadow-sm">
          <div className={"cursor-pointer"} onClick={clickInputFile}>
            <div
              className={`
              ${
                status == "isImageLoading"
                  ? "animate-bounce"
                  : status == "isWaitingTransactionConfirmation"
                  ? "animate-bounce opacity-50"
                  : ""
              }`}
            >
              {!imagePreview ? (
                <ImageUploadIcon />
              ) : (
                <img className="rounded-xl shadow-md object-cover mx-auto" src={imagePreview} />
              )}
            </div>
            <input onChange={onChange} id="file" type="file" accept="image/*" className="sr-only" />
          </div>
        </div>
      </div>
    </div>
  );
};
