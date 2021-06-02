import React from "react";

import { HomeTemplate } from "../components/templates/Home";
import { firestore, DB_VIRSION } from "../modules/firebase";
import { chainIdValues } from "../modules/web3";
import { NFTContract } from "../types";

export const Home: React.FC = () => {
  const [nftContractList, setNFTContractList] = React.useState<NFTContract[]>([]);

  React.useEffect(() => {
    const promises = chainIdValues.map((chainId) => {
      return firestore
        .collection(DB_VIRSION)
        .doc(chainId)
        .collection("nftContract")
        .where("chainId", "in", ["4", "1"]) // 4以外
        .limit(15)
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
  }, []);
  return <HomeTemplate nftContractList={nftContractList} />;
};

export default Home;
