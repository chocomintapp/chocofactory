import React from "react";

import { MypageTemplate } from "../components/templates/Mypage";
import { useWallet } from "../components/utils/hooks";
import { firestore, DB_VIRSION } from "../modules/firebase";
import { chainIdValues } from "../modules/web3";
import { NFTContract } from "../types";

export const Mypage: React.FC = () => {
  const [nftContractList, setNFTContractList] = React.useState<NFTContract[]>([]);

  const { userAddress } = useWallet();

  React.useEffect(() => {
    if (userAddress) {
      const promises = chainIdValues.map((chainId) => {
        return firestore
          .collection(DB_VIRSION)
          .doc(chainId)
          .collection("nftContract")
          .where("ownerAddress", "==", userAddress)
          .get();
      });
      Promise.all(promises).then((resolved) => {
        const nftContractList: NFTContract[] = [];
        resolved.forEach((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            nftContractList.push(doc.data() as NFTContract);
          });
        });
        setNFTContractList(nftContractList);
      });
    }
  }, [userAddress]);

  return <MypageTemplate nftContractList={nftContractList} />;
};

export default Mypage;
