import React from "react";

import { FormInput } from "../molecules/FormInput";
import { FormWithButton } from "../molecules/FormWithButton";

export const CreateContractForm: React.FC = () => {
  const handleNameChange = () => {
    console.log("ok");
  };

  return (
    <FormWithButton onClick={handleNameChange}>
      <FormInput type="text" label="name" onChange={handleNameChange} />
      <FormInput type="text" label="symbol" onChange={handleNameChange} />
    </FormWithButton>
  );
};
