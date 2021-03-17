import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { firestore } from "../../modules/firebase";
import { NFTContract, Metadata } from "../../types";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormImageUpload } from "../molecules/FormImageUpload";
import { FormInput } from "../molecules/FormInput";
import { FormTextArea } from "../molecules/FormTextArea";

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

  React.useEffect(() => {
    if (!metadata) return;
    setName(metadata.name);
    setDescription(metadata.description);
    setImage(metadata.image);
    setAnimationUrl(metadata.animationUrl);
  }, [metadata]);

  const createNFT = async () => {
    if (!nftContract || !metadata) return;
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
      .collection("v1")
      .doc(nftContract.chainId)
      .collection("nftContract")
      .doc(nftContract.nftContractAddress)
      .collection("metadata")
      .doc(metadata.tokenId.toString())
      .set(newMetadata);
    history.push(`/${nftContract.chainId}/${nftContract.nftContractAddress}`);
  };
  return nftContract && metadata ? (
    <>
      <div className="mb-8">
        <div className="flex justify-end mb-4">
          <div>
            <Link to={`/${nftContract.chainId}/${nftContract.nftContractAddress}`}>
              <button className="mb-4 focus:outline-none p-1 px-2 text-xs border rounded-md text-gray-600 mr-2">
                Cancel
              </button>
            </Link>
          </div>
          <div>
            <button
              onClick={createNFT}
              className="mb-4 focus:outline-none p-1 px-2 text-xs bg-green-400 rounded-md text-white mr-2"
            >
              Save
            </button>
            <button className="mb-4 focus:outline-none p-1 px-2 text-xs bg-green-400 rounded-md text-white">
              Mint
            </button>
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
    </>
  ) : (
    <></>
  );
};
