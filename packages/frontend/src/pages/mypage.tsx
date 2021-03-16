import React from "react";

import { MypageTemplate } from "../components/templates/Mypage";
import { useAuth } from "../modules/auth";
import { firestore, nftContractCollectionName } from "../modules/firebase";
import { NFTContract } from "../types";

export const Mypage: React.FC = () => {
  const [nftContractList, setNFTContractList] = React.useState<NFTContract[]>([]);

  const { signerAddressState } = useAuth();

  React.useEffect(() => {
    console.log(nftContractCollectionName);
    console.log(signerAddressState);
    if (signerAddressState) {
      firestore
        .collection(nftContractCollectionName)
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
