import React from "react";

import { NFTContract } from "../../types";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../molecules/AuthGuard";
import { Contract } from "../organisms/Contract";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export interface ContractTemplateProps {
  nftContract?: NFTContract;
}

export const ContractTemplate: React.FC<ContractTemplateProps> = ({ nftContract }) => {
  return (
    <Main>
      <Header />
      <Container>
        <AuthGuard>{nftContract && <Contract nftContract={nftContract} metadataList={[]} />}</AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
