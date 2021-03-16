import React from "react";
import { useAuth } from "../../modules/auth";
import { firestore } from "../../modules/firebase";
import { networkName } from "../../modules/web3";
import { NFTContract, Metadata } from "../../types";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormImageUpload } from "../molecules/FormImageUpload";
import { FormInput } from "../molecules/FormInput";
import { FormTextArea } from "../molecules/FormTextArea";
import { MessageModal, useMessageModal } from "../molecules/MessageModal";

export interface NFTProps {
  nftContract?: NFTContract;
  metadata?: Metadata;
  tokenId: string;
}

export const NFT: React.FC<NFTProps> = ({ nftContract, metadata, tokenId }) => {
  const [token_id, setTokenId] = React.useState(tokenId);
  const [name, setName] = React.useState(metadata ? metadata.name : "");
  const [description, setDescription] = React.useState(metadata ? metadata.description : "");
  const [image, setImage] = React.useState("");
  const [animation_url, setAnimationUrl] = React.useState("");

  const { connectWallet } = useAuth();
  const { messageModal, openModal, closeModal } = useMessageModal();

  const createNFT = async () => {
    if (!nftContract) return;
    console.log(token_id);
    console.log(name);
    console.log(description);
    console.log(image);
    console.log(animation_url);
    const metadata: Metadata = {
      nftContractAddress: nftContract.nftContractAddress,
      token_id,
      name,
      description,
      image,
      animation_url,
    };
    await firestore
      .collection("v1")
      .doc(networkName)
      .collection("nftContract")
      .doc(nftContract.nftContractAddress)
      .collection("metadata")
      .doc(token_id)
      .set(metadata);
    openModal("🎉", `Your NFT is created!`, "Check", `/contracts/${nftContract.nftContractAddress}`, false);
  };
  return nftContract ? (
    <>
      <div className="mb-8">
        <Form>
          <FormInput type="number" label="TokenID" setState={setTokenId} />
          <FormInput type="text" label="Name" setState={setName} />
          <FormTextArea label="Description" setState={setDescription} />
          <FormImageUpload label="Image" preview={image} setState={setImage} />
          <FormImageUpload label="Animation URL" preview={animation_url} setState={setAnimationUrl} />
        </Form>
      </div>
      <Button onClick={createNFT} type="primary">
        Create
      </Button>
      {messageModal && <MessageModal {...messageModal} onClickDismiss={closeModal} />}
    </>
  ) : (
    <></>
  );
};
