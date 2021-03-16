import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../molecules/AuthGuard";
import { CreateNFTContractForm } from "../organisms/CreateNFTContractForm";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const CreateNFTContractTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>
        <AuthGuard>
          <CreateNFTContractForm />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
