import React from "react";
import { NFTContract, ContractCountsForChainId } from "../../types";
import { Main } from "../atoms/Main";
import { ChocoV1 } from "../organisms/ChocoV1";
import { ChocoV2 } from "../organisms/ChocoV2";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { Multichain } from "../organisms/Multichain";
import { SNS } from "../organisms/SNS";
import { SampleNFTs } from "../organisms/SampleNFTs";
import { Top } from "../organisms/Top";
import { Total } from "../organisms/Total";

export interface HomeTemplateProps {
  nftContractList: NFTContract[];
  contractCountsForChainId: ContractCountsForChainId[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ nftContractList, contractCountsForChainId }) => {
  return (
    <Main>
      <Header />
      <Top />
      <ChocoV1 />
      <Total nftContractList={nftContractList} contractCountsForChainId={contractCountsForChainId} />
      {/* TODO: Add sample NFTs */}
      {/* <SampleNFTs /> */}
      <Multichain />
      <ChocoV2 />
      <SNS />
      <Footer />
    </Main>
  );
};
