import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { Footer } from "./Footer";

export default {
  title: "Organisms/Footer",
  component: Footer,
};

export const Control: React.FC = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <Footer {...props}>{props.children}</Footer>
    </MemoryRouter>
  </RecoilRoot>
);
