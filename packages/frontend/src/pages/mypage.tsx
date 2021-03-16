import React from "react";

import { MypageTemplate } from "../components/templates/Mypage";
import { useAuth } from "../modules/auth";
import { firestore } from "../modules/firebase";
import { networkName } from "../modules/web3";
import { NFTContract } from "../types";

export const Mypage: React.FC = () => {
  const [nftContractList, setNFTContractList] = React.useState<NFTContract[]>([]);

  const { signerAddressState } = useAuth();

  React.useEffect(() => {
    if (signerAddressState) {
      console.log(signerAddressState);
      firestore
        .collection("v1")
        .doc(networkName)
        .collection("nftContract")
        .where("ownerAddress", "==", signerAddressState)
        .get()
        .then((querySnapshot) => {
          const nftContractList: NFTContract[] = [];
          querySnapshot.forEach((doc) => {
            nftContractList.push(doc.data() as NFTContract);
          });
          setNFTContractList(nftContractList);
        });
    }
  }, [signerAddressState]);

  return <MypageTemplate nftContractList={nftContractList} />;
};

export default Mypage;
