import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { NFTTemplate } from "../../../../components/templates/NFT";
import { useWallet } from "../../../../components/utils/hooks";
import { firestore, DB_VIRSION } from "../../../../modules/firebase";
import { Metadata, NFTContract } from "../../../../types";

export const NFTGrid: React.FC = () => {
  const [nftContract, setNFTContract] = React.useState<NFTContract>();
  const [metadata, setMetadata] = React.useState<Metadata>();
  const { chainId, nftContractAddress, tokenId } = useParams<{
    chainId: string;
    nftContractAddress: string;
    tokenId: string;
  }>();

  const { userAddress } = useWallet();
  const history = useHistory();

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
          } else {
            history.push("/mypage");
          }
        })
        .catch((err) => {
          history.push("/mypage");
        });

      firestore
        .collection(DB_VIRSION)
        .doc(chainId)
        .collection("nftContract")
        .doc(nftContractAddress)
        .collection("metadata")
        .doc(tokenId)
        .get()
        .then((doc) => {
          if (doc.exists) {
            setMetadata(doc.data() as Metadata);
          } else {
            setMetadata({
              chainId,
              nftContractAddress,
              tokenId: parseInt(tokenId),
              name: "",
              description: "",
              image: "",
              animationUrl: "",
            });
          }
        });
    }
  }, [userAddress]);

  return <NFTTemplate nftContract={nftContract} metadata={metadata} />;
};

export default NFTGrid;
