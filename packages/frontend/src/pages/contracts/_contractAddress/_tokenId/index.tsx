import React from "react";
import { useParams } from "react-router-dom";
import { NFTTemplate } from "../../../../components/templates/NFT";
import { useAuth } from "../../../../modules/auth";
import { firestore } from "../../../../modules/firebase";
import { networkName } from "../../../../modules/web3";
import { Metadata, NFTContract } from "../../../../types";

export const NFT: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();
  const [metadata, setMetadata] = React.useState<Metadata>();
  const { nftContractAddress, tokenId } = useParams<{ nftContractAddress: string; tokenId: string }>();

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
        .doc(tokenId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setMetadata(doc.data() as Metadata);
          }
        });
    }
  }, [signerAddressState]);

  return <NFTTemplate nftContract={nftContract} metadata={metadata} tokenId={tokenId} />;
};

export default NFT;
