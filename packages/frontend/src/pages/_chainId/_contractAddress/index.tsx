import React from "react";
import { useParams } from "react-router-dom";
import { ContractTemplate } from "../../../components/templates/Contract";
import { useAuth } from "../../../modules/auth";
import { firestore } from "../../../modules/firebase";
import { getContractsForChainId } from "../../../modules/web3";
import { NFTContract, Metadata } from "../../../types";

export const Contract: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();
  const [metadataList, setMetadataList] = React.useState<Metadata[]>([]);
  const [deployed, setDeployed] = React.useState<boolean>(false);

  const { nftContractAddress, chainId } = useParams<{ chainId: string; nftContractAddress: string }>();

  const { signerAddressState } = useAuth();

  React.useEffect(() => {
    if (signerAddressState) {
      firestore
        .collection("v1")
        .doc(chainId)
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
        .doc(chainId)
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
    const { chocofactoryContract } = getContractsForChainId(chainId);
    const DeployEvent = chocofactoryContract.filters.Deployed(null, null, nftContractAddress, null);
    chocofactoryContract.queryFilter(DeployEvent, 0, "latest").then((events) => {
      setDeployed(events.length > 0);
    });
  }, [signerAddressState]);

  return <ContractTemplate nftContract={nftContract} metadataList={metadataList} deployed={deployed} />;
};

export default Contract;
