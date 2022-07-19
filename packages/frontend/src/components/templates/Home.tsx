import React from "react";
import { NFTContract, ContractCountsForChainId } from "../../types";
import { Main } from "../atoms/Main";
import { ChocoV1 } from "../organisms/ChocoV1";
import { ChocoV2 } from "../organisms/ChocoV2";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { SampleNFTs } from "../organisms/SampleNFTs";
import { Stats } from "../organisms/Stats";
import { SupportedChains } from "../organisms/SupportedChains";
import { Top } from "../organisms/Top";

export interface HomeTemplateProps {
  nftContractList: NFTContract[];
  contractCountsForChainId: ContractCountsForChainId[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = () => {
  return (
    <Main>
      <Header />
      <Top />
      <ChocoV1 />
      <Stats />
      {/* TODO: Add sample NFTs */}
      {/* <SampleNFTs /> */}
      <SupportedChains />
      <ChocoV2 />
      <Footer />
    </Main>
  );
};
