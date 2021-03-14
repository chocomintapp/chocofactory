import React from "react";
import { FormWithButton, FormWithButtonProps } from "../molecules/FormWithButton";

const args: FormWithButtonProps = {
  children: "FormWithButton",
};

export default {
  title: "Molecules/FormWithButton",
  component: FormWithButton,
  args,
};

export const Control: React.FC<FormWithButtonProps> = (props) => (
  <FormWithButton {...props}>{props.children}</FormWithButton>
);
