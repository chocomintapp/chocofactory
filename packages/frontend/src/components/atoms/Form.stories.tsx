import React from "react";
import { Form, FormProps } from "./Form";

const args: FormProps = {
  children: "Form",
};

export default {
  title: "Atoms/Form",
  component: Form,
  args,
};

export const Control: React.FC<FormProps> = (props) => <Form {...props}>{props.children}</Form>;
