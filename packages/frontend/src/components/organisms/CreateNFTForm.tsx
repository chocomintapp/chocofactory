import React from "react";

import { useHistory } from "react-router-dom";
import { firestore } from "../../modules/firebase";
import { Metadata } from "../../types";
import { Button } from "../atoms/Button";
import { Form } from "../atoms/Form";
import { FormInput } from "../molecules/FormInput";
import { FormRadio } from "../molecules/FormRadio";

export interface CreateNFTFormProps {
  chainId: string;
  nftContractAddress: string;
  onClickDismiss?: () => void;
}

export const CreateNFTForm: React.FC<CreateNFTFormProps> = ({ chainId, nftContractAddress }) => {
  const numberingLabels = ["Serial"];
  const numberingValues = ["serial"];

  const [, setNumbering] = React.useState(numberingValues[0]);
  const [copyFromId, setCopyFromId] = React.useState("");
  const [quantity, setQuantity] = React.useState(1);

  const [newTokenId, setNewTokenId] = React.useState<number>(1);

  const history = useHistory();

  React.useEffect(() => {
    firestore
      .collection("v1")
      .doc(chainId)
      .collection("nftContract")
      .doc(nftContractAddress)
      .collection("metadata")
      .orderBy("tokenId", "desc")
      .limit(1)
      .get()
      .then((querySnapshots) => {
        querySnapshots.forEach((querySnapshot) => {
          const { tokenId } = querySnapshot.data();
          setNewTokenId(tokenId + 1);
        });
      });
  });

  const createNFT = async () => {
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
        for (let i = 0; i < quantity; i++) {
          template.tokenId = newTokenId + i;
          batch.set(
            firestore
              .collection("v1")
              .doc(chainId)
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
      <div className="text-left my-8">
        <Form>
          <FormRadio label="Numbering" labels={numberingLabels} values={numberingValues} setState={setNumbering} />
          <FormInput type="number" value={copyFromId} label="Copy from" setState={setCopyFromId} />
          {copyFromId && <FormInput type="number" value={quantity} label="Quantity" setState={setQuantity} />}
        </Form>
      </div>
      <Button onClick={createNFT} type="primary">
        Create
      </Button>
    </section>
  );
};
