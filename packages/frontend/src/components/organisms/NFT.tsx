import { FormControl, FormLabel, Input, HStack, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { confirmIcon } from "../../configs.json";
import { analytics, firestore, DB_VIRSION } from "../../modules/firebase";
import { NFTContract, Metadata } from "../../types";
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

  const [attributes, setAttributes] = React.useState(
    [] as { index: number; trait_type: string; value: string | number }[]
  );

  const addTrait = () => {
    const newTrait = attributes.concat([
      {
        index: attributes.length,
        trait_type: "",
        value: "",
      },
    ]);
    setAttributes(newTrait);
  };

  const handleTraitChange = (traitIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newAttributes = attributes.map((attribute, i) => {
      if (i === traitIndex) {
        return { index: traitIndex, trait_type: e.currentTarget.value, value: attribute.value };
      } else return attribute;
    });
    setAttributes(newAttributes);
  };

  const handleTraitValueChange = (traitIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newAttributes = attributes.map((attribute, i) => {
      if (i === traitIndex) {
        return { index: traitIndex, trait_type: attribute.trait_type, value: e.currentTarget.value };
      } else return attribute;
    });
    setAttributes(newAttributes);
  };

  const removeTrait = (traitIndex: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const newAttributes = attributes
      .filter((n) => {
        return n.index !== traitIndex;
      })
      .map((attribute, i) => {
        return { index: i, trait_type: attribute.trait_type, value: attribute.value };
      });
    setAttributes(newAttributes);
  };

  const history = useHistory();
  const { openLoadingOverlay, closeLoadingOverlay } = useLoadingOverlay();
  const { openNotificationToast } = useNotificationToast();

  React.useEffect(() => {
    if (!metadata) return;
    setName(metadata.name);
    setDescription(metadata.description);
    setImage(metadata.image);
    setAnimationUrl(metadata.animationUrl);
    if (!metadata.attributes) return;
    const savedAttributes = metadata.attributes.map((attribute, i) => {
      return { index: i, trait_type: attribute.trait_type, value: attribute.value };
    });
    setAttributes(savedAttributes);
  }, [metadata]);

  const createNFT = async () => {
    if (!nftContract || !metadata) return;
    openLoadingOverlay();
    const formattedAttributes = attributes.map((attribute) => {
      return { trait_type: attribute.trait_type, value: attribute.value };
    });
    const newMetadata: Metadata = {
      chainId: nftContract.chainId,
      nftContractAddress: nftContract.nftContractAddress,
      tokenId: metadata.tokenId,
      name,
      description,
      image,
      animationUrl,
      attributes: formattedAttributes,
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

    analytics.logEvent("click", {
      type: "button",
      name: "save_nft",
    });

    history.push(`/${nftContract.chainId}/${nftContract.nftContractAddress}`);
  };

  return nftContract && metadata ? (
    <section>
      <div className="mb-8">
        <div className="flex justify-end mb-4">
          <div className="mr-2">
            <Link to={`/${nftContract.chainId}/${nftContract.nftContractAddress}`}>
              <Button colorScheme="gray" size="sm">
                Cancel<span className="ml-2">↩</span>
              </Button>
            </Link>
          </div>
          <div className="mr-2">
            <Button onClick={createNFT} colorScheme="teal" size="sm">
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
            accept="audio/*,video/*,image/*,.glb"
            value={animationUrl}
            setState={setAnimationUrl}
          />
          <FormControl>
            <FormLabel margin="16px 0 ">Attributes</FormLabel>
            {attributes.map((attribute, traitIndex: number) => (
              <div key={traitIndex}>
                <HStack mt="2">
                  <Input
                    key={`type${traitIndex}`}
                    name={traitIndex.toString()}
                    placeholder="Trait"
                    value={attribute.trait_type}
                    onChange={(e) => handleTraitChange(traitIndex, e)}
                  />
                  <Input
                    key={`value${traitIndex}`}
                    name={traitIndex.toString()}
                    placeholder="Value"
                    value={attribute.value}
                    onChange={(e) => handleTraitValueChange(traitIndex, e)}
                  />
                  <Button colorScheme="teal" onClick={(e) => removeTrait(traitIndex, e)}>
                    ×
                  </Button>
                </HStack>
              </div>
            ))}
          </FormControl>
          <HStack mt={4}>
            <Button colorScheme="teal" onClick={addTrait}>
              +
            </Button>
          </HStack>
        </Form>
      </div>
    </section>
  ) : (
    <></>
  );
};
