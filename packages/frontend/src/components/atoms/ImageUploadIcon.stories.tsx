import React from "react";
import { ImageUploadIcon } from "./ImageUploadIcon";

export default {
  title: "Atoms/ImageUploadIcon",
  component: ImageUploadIcon,
};

export const Control: React.FC = (props) => <ImageUploadIcon {...props}>{props.children}</ImageUploadIcon>;
