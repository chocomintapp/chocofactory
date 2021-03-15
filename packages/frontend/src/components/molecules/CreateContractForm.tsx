import React from "react";

import { Form } from "../atoms/Form";
import { FormInput } from "../molecules/FormInput";

export const CreateContractForm: React.FC = () => {
  const handleNameChange = () => {
    console.log("ok");
  };

  return (
    <Form>
      <FormInput type="text" label="Blockchain" onChange={handleNameChange} />
      <FormInput type="text" label="Name" onChange={handleNameChange} />
      <FormInput type="text" label="Symbol" onChange={handleNameChange} />
    </Form>
  );
};
