import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../molecules/AuthGuard";
import { ContractDetail } from "../organisms/ContractDetail";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const ContractTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>
        <AuthGuard>
          <ContractDetail nftContract={{} as any} metadataList={[]} />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
