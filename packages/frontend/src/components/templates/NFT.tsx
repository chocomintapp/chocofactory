import React from "react";

import { NFTContract, Metadata } from "../../types";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../organisms/AuthGuard";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { NFT } from "../organisms/NFT";

export interface NFTTemplateProps {
  nftContract?: NFTContract;
  metadata?: Metadata;
}

export const NFTTemplate: React.FC<NFTTemplateProps> = ({ nftContract, metadata }) => {
  return (
    <Main>
      <Header />
      <Container type="narrow">
        <AuthGuard>
          <NFT nftContract={nftContract} metadata={metadata} />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
