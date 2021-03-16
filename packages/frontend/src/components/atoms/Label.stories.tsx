import React from "react";
import { Label, LabelProps } from "./Label";

const args: LabelProps = {
  text: "label",
};

export default {
  title: "Atoms/Label",
  component: Label,
  args,
};

export const Control: React.FC<LabelProps> = (props) => <Label {...props}>{props.children}</Label>;
