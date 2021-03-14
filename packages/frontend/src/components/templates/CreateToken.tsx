import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { CreateTokenForm } from "../organisms/CreateTokenForm";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const CreateTokenTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>
        <CreateTokenForm />
      </Container>
      <Footer />
    </Main>
  );
};
