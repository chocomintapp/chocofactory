import React from "react";

import { Button } from "../atoms/Button";
import { FormImageUpload } from "../molecules/FormImageUpload";
import { FormInput } from "../molecules/FormInput";
import { FormTextArea } from "../molecules/FormTextArea";
import { FormWithButton } from "../molecules/FormWithButton";

export const CreateTokenForm: React.FC = () => {
  const handleNameChange = () => {
    console.log("ok");
  };

  return (
    <FormWithButton onClick={handleNameChange}>
      <FormInput type="text" label="name" onChange={handleNameChange} />
      <FormTextArea label="description" onChange={handleNameChange} />
      <FormImageUpload label="image" status="normal" imagePreview="" onChange={handleNameChange} />
    </FormWithButton>
  );
};
