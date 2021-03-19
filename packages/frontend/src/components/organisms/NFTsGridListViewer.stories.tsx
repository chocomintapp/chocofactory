import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { NFTsGridListViewer, NFTsGridListViewerProps } from "./NFTsGridListViewer";

const args: NFTsGridListViewerProps = {
  nftContract: nftContractList[0],
  metadataList,
};

export default {
  title: "Organisms/NFTsGridListViewer",
  component: NFTsGridListViewer,
  args,
};

export const Control: React.FC<NFTsGridListViewerProps> = (props) => (
  <RecoilRoot>
    <MemoryRouter>
      <NFTsGridListViewer {...props}>{props.children}</NFTsGridListViewer>
    </MemoryRouter>
  </RecoilRoot>
);
