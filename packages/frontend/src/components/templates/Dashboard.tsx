import React from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { Button } from "../atoms/Button";
import { Container } from "../atoms/Container";
import { Main } from "../atoms/Main";
import { WalletConnect } from "../molecules/WalletConnect";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const DashboardTemplate: React.FC = () => {
  // const [selectedAddress] = useRecoilState(selectedAddressState);
  return (
    <Main>
      <Header />
      {/* <Container>
        {selectedAddress ? (
          <Link to="/create">
            <Button type="primary">Create NFT Contract</Button>{" "}
          </Link>
        ) : (
          <WalletConnect />
        )}
      </Container> */}
      <Footer />
    </Main>
  );
};
