import React from "react";
import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract, ContractCountsForChainId } from "../../types";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { Hero } from "../organisms/Hero";
import { NFTsInfoViewer } from "../organisms/NFTsInfoViewer";

export interface HomeTemplateProps {
  nftContractList: NFTContract[];
  contractCountsForChainId: ContractCountsForChainId[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ nftContractList, contractCountsForChainId }) => {
  return (
    <Main>
      <Header />
      <Hero />
      <h2 className="text-center text-gray-600 text-2xl font-bold mt-12">Total Projects Created</h2>
      <div className="flex justify-center mb-4">
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
      </Container>
      <Footer />
    </Main>
  );
};
