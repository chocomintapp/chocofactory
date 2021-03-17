import React from "react";

import { useHistory } from "react-router-dom";
import { mainIcon } from "../../configs.json";

import { firestore } from "../../modules/firebase";
import { networkName } from "../../modules/web3";
import { Metadata } from "../../types";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { Modal } from "../atoms/Modal";
import { FormInput } from "./FormInput";
import { FormRadio } from "./FormRadio";

export interface CreateNFTModalProps {
  chainId: string;
  nftContractAddress: string;
  onClickDismiss?: () => void;
}

export const CreateNFTModal: React.FC<CreateNFTModalProps> = ({ chainId, nftContractAddress, onClickDismiss }) => {
  const numberingLabels = ["Serial", "Free"];
  const numberingValues = ["serial", "free"];

  const [numbering, setNumbering] = React.useState(numberingValues[0]);

  const [tokenId, setTokenId] = React.useState<number>(1);
  const [copyFromId, setCopyFromId] = React.useState("");
  const [amount, setAmount] = React.useState(1);

  const history = useHistory();

  const createNFT = async () => {
    let newTokenId;
    if (numbering == "free") {
      newTokenId = tokenId;
    } else {
      const querySnapshots = await firestore
        .collection("v1")
        .doc(chainId)
        .collection("nftContract")
        .doc(nftContractAddress)
        .collection("metadata")
        .orderBy("tokenId", "desc")
        .limit(1)
        .get();
      querySnapshots.forEach((querySnapshot) => {
        const { tokenId } = querySnapshot.data();
        newTokenId = tokenId + 1;
      });
      if (!newTokenId) {
        newTokenId = 1;
      }
    }
    if (copyFromId) {
      const doc = await firestore
        .collection("v1")
        .doc(chainId)
        .collection("nftContract")
        .doc(nftContractAddress)
        .collection("metadata")
        .doc(copyFromId)
        .get();
      if (doc.exists) {
        const batch = firestore.batch();
        const template = doc.data() as Metadata;
        for (let i = 0; i < amount; i++) {
          console.log("i", i);
          template.tokenId = newTokenId + i;
          console.log("tokenId", template.tokenId);
          batch.set(
            firestore
              .collection("v1")
              .doc(networkName)
              .collection("nftContract")
              .doc(nftContractAddress)
              .collection("metadata")
              .doc(template.tokenId.toString()),
            template
          );
        }
        await batch.commit();
      }
      history.push(`/${chainId}/${nftContractAddress}`);
    } else {
      history.push(`/${chainId}/${nftContractAddress}/${newTokenId}`);
    }
  };
  return (
    <section>
      <Modal icon={mainIcon} onClickDismiss={onClickDismiss}>
        <div className="text-left my-8">
          <Form>
            <FormRadio label="Numbering" labels={numberingLabels} values={numberingValues} setState={setNumbering} />
            {numbering == "free" && <FormInput type="number" value={tokenId} label="TokenID" setState={setTokenId} />}
            <FormInput type="number" value={copyFromId} label="Copy from" setState={setCopyFromId} />
            {numbering == "serial" && copyFromId && (
              <FormInput type="number" value={amount} label="Amount" setState={setAmount} />
            )}
          </Form>
        </div>
        <Button onClick={createNFT} type="primary">
          Create
        </Button>
      </Modal>
    </section>
  );
};

export const useCreateNFTModal = () => {
  const [createNFTModal, setCreateNFTModal] = React.useState<boolean>(false);

  const toggleModal = () => {
    setCreateNFTModal(!createNFTModal);
  };

  return { createNFTModal, toggleModal };
};
