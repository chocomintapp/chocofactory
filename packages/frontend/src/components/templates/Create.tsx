import React from "react";

import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const CreateTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>Create</Container>
      <Footer />
    </Main>
  );
};
