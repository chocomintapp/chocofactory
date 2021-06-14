import React from "react";

import { HomeTemplate } from "../components/templates/Home";
import { firestore, DB_VIRSION } from "../modules/firebase";
import { chainIdValues } from "../modules/web3";
import { NFTContract, ContractCountsForChainId } from "../types";

export const Home: React.FC = () => {
  const [nftContractList, setNFTContractList] = React.useState<NFTContract[]>([]);
  const [contractCountsForChainId, setContracCountsForChainId] = React.useState<ContractCountsForChainId[]>([]);

  React.useEffect(() => {
    const promises = chainIdValues.map((chainId) => {
      return firestore.collection(DB_VIRSION).doc(chainId).collection("nftContract").get();
    });
    Promise.all(promises).then((resolved) => {
      const nftContractList: NFTContract[] = [];
      resolved.forEach((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          nftContractList.push(doc.data() as NFTContract);
        });
      });
      setNFTContractList(nftContractList);
      const contractCounts = chainIdValues.map((chainId) => {
        const contractsForChainId = nftContractList.filter((contract) => contract.chainId == chainId);
        return { chainId, count: contractsForChainId.length };
      });
      setContracCountsForChainId(contractCounts);
    });
  }, []);
  return <HomeTemplate nftContractList={nftContractList} contractCountsForChainId={contractCountsForChainId} />;
};

export default Home;
