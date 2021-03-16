import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { MypageTemplate } from "./Mypage";

export default {
  title: "Templates/Mypage",
  component: MypageTemplate,
};

export const Control: React.FC = () => (
  <RecoilRoot>
    <MemoryRouter>
      <MypageTemplate />
    </MemoryRouter>
  </RecoilRoot>
);
