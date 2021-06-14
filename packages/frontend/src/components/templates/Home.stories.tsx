import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { HomeTemplate, HomeTemplateProps } from "./Home";

const args: HomeTemplateProps = {
  nftContractList,
  contractCountsForChainId: [],
};
export default {
  title: "Templates/HomeTemplate",
  component: HomeTemplate,
  args,
};

export const Control: React.FC<HomeTemplateProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <HomeTemplate {...props}>{props.children}</HomeTemplate>
    </MemoryRouter>
  </RecoilRoot>
);
