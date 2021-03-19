import React from "react";

import { useParams } from "react-router-dom";
import { ContractTemplate } from "../../../components/templates/Contract";
import { userWallet } from "../../../components/utils/hooks";
import { firestore, DB_VIRSION } from "../../../modules/firebase";
import { getContractsForChainId, NULL_ADDRESS } from "../../../modules/web3";
import { NFTContract, Metadata } from "../../../types";

export const Contract: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();
  const [metadataList, setMetadataList] = React.useState<Metadata[]>([]);
  const [deployed, setDeployed] = React.useState<boolean>(false);
  const [mintedTokenIds, setMintedTokenIds] = React.useState<string[]>([]);

  const { nftContractAddress, chainId } = useParams<{ chainId: string; nftContractAddress: string }>();

  const { userAddress } = userWallet();

  React.useEffect(() => {
    if (userAddress) {
      firestore
        .collection(DB_VIRSION)
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
        .collection(DB_VIRSION)
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
    const { chocofactoryContract, chocomoldContract } = getContractsForChainId(chainId);
    const DeployEvent = chocofactoryContract.filters.Deployed(null, null, nftContractAddress, null, null);
    chocofactoryContract.queryFilter(DeployEvent, 0, "latest").then((events) => {
      setDeployed(events.length > 0);
    });
    const MintEvent = chocomoldContract.filters.Transfer(NULL_ADDRESS, null, null);
    chocomoldContract
      .attach(nftContractAddress)
      .queryFilter(MintEvent, 0, "latest")
      .then((events) => {
        const tokenIds = events.map((event) => event.args!.tokenId.toString());
        setMintedTokenIds(tokenIds);
      });
  }, [userAddress]);

  return (
    <ContractTemplate
      nftContract={nftContract}
      metadataList={metadataList}
      deployed={deployed}
      mintedTokenIds={mintedTokenIds}
    />
  );
};

export default Contract;
