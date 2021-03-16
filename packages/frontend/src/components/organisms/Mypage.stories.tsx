import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { Mypage, MypageProps } from "./Mypage";

const args: MypageProps = {
  nftContractList,
};

export default {
  title: "Organisms/Mypage",
  component: Mypage,
  args,
};

export const Control: React.FC<MypageProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <Mypage {...props}>{props.children}</Mypage>
    </MemoryRouter>
  </RecoilRoot>
);
