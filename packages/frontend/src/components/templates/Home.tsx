import React from "react";
import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract, ContractCountsForChainId } from "../../types";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import About from "../organisms/About";
import AboutChoco from "../organisms/AboutChoco";
import ExplainChocoV2 from "../organisms/ExplainChocoV2";
import Feature from "../organisms/Feature";
import Footer from "../organisms/Footer";
import { Header } from "../organisms/Header";
// import { Hero } from "../organisms/Hero";
import Multichain from "../organisms/Multichain";
import Multichain2 from "../organisms/Multichain2";
import { NFTsInfoViewer } from "../organisms/NFTsInfoViewer";
import SNS from "../organisms/SNS";
import SNS2 from "../organisms/SNS2";
import CallToActionWithAnnotation from "../organisms/Top";
import Toppage from "../organisms/Toppage";
import { Total } from "../organisms/Total";

export interface HomeTemplateProps {
  nftContractList: NFTContract[];
  contractCountsForChainId: ContractCountsForChainId[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ nftContractList, contractCountsForChainId }) => {
  return (
    <Main>
      <Header />
      {/* <Hero /> */}
      {/* <CallToActionWithAnnotation /> */}
      <Toppage />
      {/* <h2 className="text-center text-gray-600 text-2xl font-bold mt-12">Total Projects Created</h2> */}
      {/* <div className="flex justify-center mb-4">
        {contractCountsForChainId.map((counts, i) => {
          return (
            <h3 key={i} className="text-center text-gray-600 font-bold m-4">
              {getNetworkNameFromChainId(counts.chainId)}: {counts.count}
            </h3>
          );
        })}
      </div>
      <Container type="wide">
        <NFTsInfoViewer nftContractList={nftContractList} />
      </Container> */}
      <Total nftContractList={nftContractList} contractCountsForChainId={contractCountsForChainId} />
      <AboutChoco />
      {/* <About /> */}
      <Feature />
      <ExplainChocoV2 />
      {/* <Multichain /> */}
      <Multichain2 />
      {/* <SNS /> */}
      <SNS2 />
      <Footer />
    </Main>
  );
};
