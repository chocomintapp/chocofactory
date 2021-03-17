import React from "react";
import { useParams } from "react-router-dom";
import { ContractTemplate } from "../../../components/templates/Contract";
import { useAuth } from "../../../modules/auth";
import { firestore } from "../../../modules/firebase";
import { networkName } from "../../../modules/web3";
import { NFTContract, Metadata } from "../../../types";

export const Contract: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();
  const [metadataList, setMetadataList] = React.useState<Metadata[]>([]);

  const { nftContractAddress } = useParams<{ nftContractAddress: string }>();

  const { signerAddressState } = useAuth();

  React.useEffect(() => {
    if (signerAddressState) {
      firestore
        .collection("v1")
        .doc(networkName)
        .collection("nftContract")
        .doc(nftContractAddress)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setNFTContract(doc.data() as NFTContract);
          }
        });

      firestore
        .collection("v1")
        .doc(networkName)
        .collection("nftContract")
        .doc(nftContractAddress)
        .collection("metadata")
        .orderBy("tokenId")
        .get()
        .then((querySnapshot) => {
          const metadataList: Metadata[] = [];
          querySnapshot.forEach((doc) => {
            metadataList.push(doc.data() as Metadata);
          });
          setMetadataList(metadataList);
        });
    }
  }, [signerAddressState]);

  return <ContractTemplate nftContract={nftContract} metadataList={metadataList} />;
};

export default Contract;
