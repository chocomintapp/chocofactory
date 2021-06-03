import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { NFTsInfoViewer, NFTsInfoViewerProps } from "./NFTsInfoViewer";

const args: NFTsInfoViewerProps = {
  nftContractList,
};

export default {
  title: "Organisms/NFTsInfoViewer",
  component: NFTsInfoViewer,
  args,
};

export const Control: React.FC<NFTsInfoViewerProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <NFTsInfoViewer {...props}>{props.children}</NFTsInfoViewer>
    </MemoryRouter>
  </RecoilRoot>
);
