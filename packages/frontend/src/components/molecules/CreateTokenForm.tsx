import React from "react";

import { Form } from "../atoms/Form";
import { FormImageUpload } from "../molecules/FormImageUpload";
import { FormInput } from "../molecules/FormInput";
import { FormTextArea } from "../molecules/FormTextArea";

export const CreateTokenForm: React.FC = () => {
  const handleNameChange = () => {
    console.log("ok");
  };

  return (
    <Form>
      <FormInput type="text" label="Name" onChange={handleNameChange} />
      <FormTextArea label="Description" onChange={handleNameChange} />
      <FormImageUpload label="Image" status="normal" imagePreview="" onChange={handleNameChange} />
      <FormImageUpload label="Animation URL" status="normal" imagePreview="" onChange={handleNameChange} />
    </Form>
  );
};
