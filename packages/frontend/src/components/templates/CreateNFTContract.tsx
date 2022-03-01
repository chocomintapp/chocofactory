import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../organisms/AuthGuard";
import { CreateNFTContractForm } from "../organisms/CreateNFTContractForm";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const CreateNFTContractTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container type="narrow">
        <AuthGuard>
          <CreateNFTContractForm />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
