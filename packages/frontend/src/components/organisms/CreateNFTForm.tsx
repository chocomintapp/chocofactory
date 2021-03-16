import React from "react";
import { useAuth } from "../../modules/auth";
import { Metadata } from "../../types";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormImageUpload } from "../molecules/FormImageUpload";
import { FormInput } from "../molecules/FormInput";
import { FormTextArea } from "../molecules/FormTextArea";
import { MessageModal, useMessageModal } from "../molecules/MessageModal";

export interface CreateNFTFormProps {
  nftContractAddress: string;
}

export const CreateNFTForm: React.FC<CreateNFTFormProps> = ({ nftContractAddress }) => {
  const [token_id, setTokenId] = React.useState("");
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [animation_url, setAnimationUrl] = React.useState("");

  const { connectWallet } = useAuth();
  const { messageModal, openModal, closeModal } = useMessageModal();

  const createNFT = async () => {
    console.log(token_id);
    console.log(name);
    console.log(description);
    console.log(image);
    console.log(animation_url);
    const metadata: Metadata = { nftContractAddress, token_id, name, description, image, animation_url };
    //  openModal("🎉", `Your NFT address is ${nftContractAddress}!`, "Check", `/contracts/${nftContractAddress}`, false);
  };
  return (
    <>
      <div className="mb-8">
        <Form>
          <FormInput type="number" label="TokenID" setState={setTokenId} />
          <FormInput type="text" label="Name" setState={setName} />
          <FormTextArea label="Description" setState={setDescription} />
          <FormImageUpload label="Image" setState={setImage} />
          <FormImageUpload label="Animation URL" setState={setAnimationUrl} />
        </Form>
      </div>
      <Button onClick={createNFT} type="primary">
        Create
      </Button>
      {messageModal && <MessageModal {...messageModal} onClickDismiss={closeModal} />}
    </>
  );
};
