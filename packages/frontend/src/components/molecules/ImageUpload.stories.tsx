import React from "react";
import { ImageUpload, ImageUploadProps } from "./ImageUpload";

const args: ImageUploadProps = {
  status: "normal",
  imagePreview: "/sample.png",
  onChange: () => {
    console.log("onchange");
  },
};

export default {
  title: "Molecules/ImageUpload",
  component: ImageUpload,
  args,
};

export const Control: React.FC<ImageUploadProps> = (props) => <ImageUpload {...props}>{props.children}</ImageUpload>;
