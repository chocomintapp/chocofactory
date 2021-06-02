import React from "react";

import { NFTContract, Metadata } from "../../types";
import { Main } from "../atoms/Main";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { Hero } from "../organisms/Hero";
import { NFTsInfoViewer } from "../organisms/NFTsInfoViewer";

export interface HomeTemplateProps {
  nftContractList: NFTContract[];
}

export const HomeTemplate: React.FC<HomeTemplateProps> = ({ nftContractList }) => {
  return (
    <Main>
      <Header />
      <Hero />
      <NFTsInfoViewer nftContractList={nftContractList} />
      <Footer />
    </Main>
  );
};
