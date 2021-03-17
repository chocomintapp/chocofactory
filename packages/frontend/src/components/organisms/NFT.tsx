import React from "react";
import { useHistory } from "react-router-dom";
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
  tokenId: number;
}

export const NFT: React.FC<NFTProps> = ({ nftContract, metadata, tokenId }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [animationUrl, setAnimationUrl] = React.useState("");

  const { connectWallet } = useAuth();
  const { messageModal, openModal, closeModal } = useMessageModal();
  const history = useHistory();

  React.useEffect(() => {
    if (!metadata) return;
    setName(metadata.name);
    setDescription(metadata.description);
    setImage(metadata.image);
    setAnimationUrl(metadata.animationUrl);
  }, [metadata]);

  const createNFT = async () => {
    if (!nftContract) return;
    const metadata: Metadata = {
      nftContractAddress: nftContract.nftContractAddress,
      tokenId: tokenId,
      name,
      description,
      image,
      animationUrl,
    };
    await firestore
      .collection("v1")
      .doc(networkName)
      .collection("nftContract")
      .doc(nftContract.nftContractAddress)
      .collection("metadata")
      .doc(tokenId.toString())
      .set(metadata);
    history.push(`/${nftContract.nftContractAddress}`);
  };
  return nftContract ? (
    <>
      <div className="mb-8">
        <Form>
          <FormInput type="number" value={tokenId} label="TokenID" />
          <FormInput type="text" value={name} label="Name" setState={setName} />
          <FormTextArea label="Description" value={description} setState={setDescription} />
          <FormImageUpload label="Image" value={image} setState={setImage} />
          <FormImageUpload label="Animation URL" value={animationUrl} setState={setAnimationUrl} />
        </Form>
      </div>
      <Button onClick={createNFT} type="primary">
        Save
      </Button>
      {messageModal && <MessageModal {...messageModal} onClickDismiss={closeModal} />}
    </>
  ) : (
    <></>
  );
};
