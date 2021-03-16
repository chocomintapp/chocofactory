import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../atoms/Button";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { AuthGuard } from "../molecules/AuthGuard";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const DashboardTemplate: React.FC = () => {
  return (
    <Main>
      <Header />
      <Container>
        <AuthGuard>
          <Link to="/create">
            <Button type="primary">Create NFT Contract</Button>{" "}
          </Link>
        </AuthGuard>
      </Container>
      <Footer />
    </Main>
  );
};
