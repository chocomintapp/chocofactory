import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../molecules/AuthGuard";
import { CreateNFTForm } from "../organisms/CreateNFTForm";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export interface CreateNFTTemplateProps {
  chainId: string;
  nftContractAddress: string;
}

export const CreateNFTTemplate: React.FC<CreateNFTTemplateProps> = ({ chainId, nftContractAddress }) => {
  return (
    <Main>
      <Header />
      <Container type="narrow">
        <AuthGuard>
          <CreateNFTForm chainId={chainId} nftContractAddress={nftContractAddress} />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
