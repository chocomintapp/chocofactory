import React from "react";

import { Form } from "../atoms/Form";
import { FormImageUpload } from "../molecules/FormImageUpload";
import { FormInput } from "../molecules/FormInput";
import { FormTextArea } from "../molecules/FormTextArea";

export const CreateNFTForm: React.FC = () => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const handleNameChange = () => {
    console.log("ok");
  };

  return (
    <Form>
      <FormInput type="text" label="Name" setState={setName} />
      <FormTextArea label="Description" setState={setDescription} />
      <FormImageUpload label="Image" status="normal" imagePreview="" onChange={handleNameChange} />
      <FormImageUpload label="Animation URL" status="normal" imagePreview="" onChange={handleNameChange} />
    </Form>
  );
};
