import React from "react";
import { MemoryRouter } from "react-router-dom";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { NFTsGridListViewer, NFTsGridListViewerProps } from "./NFTsGridListViewer";

const args: NFTsGridListViewerProps = {
  nftContract: nftContractList[0],
  metadataList,
};

export default {
  title: "Molecules/NFTsGridListViewer",
  component: NFTsGridListViewer,
  args,
};

export const Control: React.FC<NFTsGridListViewerProps> = (props) => (
  <MemoryRouter>
    <NFTsGridListViewer {...props}>{props.children}</NFTsGridListViewer>
  </MemoryRouter>
);
