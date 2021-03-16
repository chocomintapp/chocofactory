import React from "react";
import { useParams } from "react-router-dom";
import { ContractTemplate } from "../../../components/templates/Contract";
import { useAuth } from "../../../modules/auth";
import { firestore, nftContractCollectionName } from "../../../modules/firebase";
import { NFTContract } from "../../../types";

export const Contract: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();

  const { nftContractAddress } = useParams<{ nftContractAddress: string }>();

  const { signerAddressState } = useAuth();

  React.useEffect(() => {
    console.log(nftContractCollectionName);
    console.log(signerAddressState);
    console.log(nftContractAddress);
    if (signerAddressState) {
      firestore
        .collection(nftContractCollectionName)
        .doc(nftContractAddress)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setNFTContract(doc.data() as NFTContract);
          }
        });
    }
  }, [signerAddressState]);

  return <ContractTemplate nftContract={nftContract} />;
};

export default Contract;
