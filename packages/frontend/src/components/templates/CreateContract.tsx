import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../molecules/AuthGuard";
import { CreateContractForm } from "../organisms/CreateContractForm";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const CreateContractTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>
        <AuthGuard>
          <CreateContractForm />
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
