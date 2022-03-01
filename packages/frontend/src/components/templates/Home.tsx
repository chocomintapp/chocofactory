import React from "react";
import { NFTContract, ContractCountsForChainId } from "../../types";
import { Main } from "../atoms/Main";
import { About } from "../organisms/About";
import { ExplainChocoV2 } from "../organisms/ExplainChocoV2";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { Multichain } from "../organisms/Multichain";
import { SNS } from "../organisms/SNS";
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
      <Total nftContractList={nftContractList} contractCountsForChainId={contractCountsForChainId} />
      <About />
      <ExplainChocoV2 />
      <Multichain />
      <SNS />
      <Footer />
    </Main>
  );
};
