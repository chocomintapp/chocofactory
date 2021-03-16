import React from "react";
import { FormInput, FormInputProps } from "./FormInput";

const args: FormInputProps = {
  label: "label",
  type: "text",
  value: "value",
  setState: () => {
    console.log("onchange");
  },
};

export default {
  title: "Molecules/FormInput",
  component: FormInput,
  args,
};

export const Control: React.FC<FormInputProps> = (props) => <FormInput {...props}>{props.children}</FormInput>;
