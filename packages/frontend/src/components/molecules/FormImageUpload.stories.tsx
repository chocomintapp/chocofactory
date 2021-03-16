import React from "react";
import { FormImageUpload, FormImageUploadProps } from "./FormImageUpload";

const args: FormImageUploadProps = {
  label: "label",
  value: "",
  setState: () => {
    console.log("onchange");
  },
};

export default {
  title: "Molecules/FormImageUpload",
  component: FormImageUpload,
  args,
};

export const Control: React.FC<FormImageUploadProps> = (props) => (
  <FormImageUpload {...props}>{props.children}</FormImageUpload>
);
