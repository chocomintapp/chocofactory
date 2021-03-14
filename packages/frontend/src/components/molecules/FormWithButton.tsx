import React from "react";

import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";

export interface FormWithButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const FormWithButton: React.FC<FormWithButtonProps> = ({ children, onClick }) => {
  return (
    <>
      <div className="mb-8">
        <Form>{children}</Form>
      </div>
      <Button type="primary" onClick={onClick}>
        Submit
      </Button>
    </>
  );
};
