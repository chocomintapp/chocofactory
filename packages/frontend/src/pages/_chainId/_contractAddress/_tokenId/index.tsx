import React from "react";
import { useParams } from "react-router-dom";
import { NFTTemplate } from "../../../../components/templates/NFT";
import { useAuth } from "../../../../modules/auth";
import { firestore } from "../../../../modules/firebase";
import { Metadata, NFTContract } from "../../../../types";

export const NFTGrid: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();
  const [metadata, setMetadata] = React.useState<Metadata>();
  const { chainId, nftContractAddress, tokenId } = useParams<{
    chainId: string;
    nftContractAddress: string;
    tokenId: string;
  }>();

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
        .doc(tokenId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setMetadata(doc.data() as Metadata);
          }
        });
    }
  }, [signerAddressState]);

  return <NFTTemplate nftContract={nftContract} metadata={metadata} tokenId={parseInt(tokenId)} />;
};

export default NFTGrid;
