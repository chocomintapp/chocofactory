import React from "react";
import { FormTextArea, FormTextAreaProps } from "./FormTextArea";

const args: FormTextAreaProps = {
  label: "label",
  value: "value",
  setState: () => {
    console.log("onchange");
  },
};

export default {
  title: "Molecules/FormTextArea",
  component: FormTextArea,
  args,
};

export const Control: React.FC<FormTextAreaProps> = (props) => <FormTextArea {...props}>{props.children}</FormTextArea>;
