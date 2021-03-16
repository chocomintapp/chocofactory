import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../molecules/AuthGuard";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const CreateTokenTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>
        <AuthGuard>create token</AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
