import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { confirmIcon } from "../../configs.json";
import { firestore, DB_VIRSION } from "../../modules/firebase";
import { NFTContract, Metadata } from "../../types";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormImageUpload } from "../molecules/FormImageUpload";
import { FormInput } from "../molecules/FormInput";
import { FormTextArea } from "../molecules/FormTextArea";
import { useLoadingOverlay, useNotificationToast } from "../utils/hooks";

export interface NFTProps {
  nftContract?: NFTContract;
  metadata?: Metadata;
}

export const NFT: React.FC<NFTProps> = ({ nftContract, metadata }) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [image, setImage] = React.useState("");
  const [animationUrl, setAnimationUrl] = React.useState("");

  const history = useHistory();
  const { openLoadingOverlay, closeLoadingOverlay } = useLoadingOverlay();
  const { openNotificationToast } = useNotificationToast();
  React.useEffect(() => {
    if (!metadata) return;
    setName(metadata.name);
    setDescription(metadata.description);
    setImage(metadata.image);
    setAnimationUrl(metadata.animationUrl);
  }, [metadata]);
  const createNFT = async () => {
    if (!nftContract || !metadata) return;
    openLoadingOverlay();
    const newMetadata: Metadata = {
      chainId: nftContract.chainId,
      nftContractAddress: nftContract.nftContractAddress,
      tokenId: metadata.tokenId,
      name,
      description,
      image,
      animationUrl,
    };
    await firestore
      .collection(DB_VIRSION)
      .doc(nftContract.chainId)
      .collection("nftContract")
      .doc(nftContract.nftContractAddress)
      .collection("metadata")
      .doc(metadata.tokenId.toString())
      .set(newMetadata);
    openNotificationToast({ type: "success", text: "NFT is saved!" });
    closeLoadingOverlay();
    history.push(`/${nftContract.chainId}/${nftContract.nftContractAddress}`);
  };

  return nftContract && metadata ? (
    <section>
      <div className="mb-8">
        <div className="flex justify-end mb-4">
          <div className="mr-2">
            <Link to={`/${nftContract.chainId}/${nftContract.nftContractAddress}`}>
              <Button type="secondary" size="small">
                Cancel<span className="ml-2">↩</span>
              </Button>
            </Link>
          </div>
          <div className="mr-2">
            <Button onClick={createNFT} type="primary" size="small">
              Save<span className="ml-2">💾</span>
            </Button>
          </div>
        </div>
        <Form>
          <FormInput type="number" value={metadata.tokenId} label="TokenID" readonly={true} />
          <FormInput type="text" value={name} label="Name" setState={setName} />
          <FormTextArea label="Description" value={description} setState={setDescription} />
          <FormImageUpload label="Image" accept="video/*,image/*" value={image} setState={setImage} />
          <FormImageUpload
            label="Animation URL"
            accept="audio/*,video/*,image/*"
            value={animationUrl}
            setState={setAnimationUrl}
          />
        </Form>
      </div>
    </section>
  ) : (
    <></>
  );
};
