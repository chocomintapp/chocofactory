import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { MypageTemplate, MypageTemplateProps } from "./Mypage";
const args: MypageTemplateProps = {
  nftContractList,
};

export default {
  title: "Templates/Mypage",
  component: MypageTemplate,
  args,
};

export const Control: React.FC<MypageTemplateProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <MypageTemplate {...props}>{props.children}</MypageTemplate>
    </MemoryRouter>
  </RecoilRoot>
);
