import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { ContractDetail, ContractDetailProps } from "./ContractDetail";

const args: ContractDetailProps = {
  nftContract: nftContractList[0],
  metadataList,
};

export default {
  title: "Organisms/ContractDetail",
  component: ContractDetail,
  args,
};

export const Control: React.FC<ContractDetailProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <ContractDetail {...props}>{props.children}</ContractDetail>
    </MemoryRouter>
  </RecoilRoot>
);
