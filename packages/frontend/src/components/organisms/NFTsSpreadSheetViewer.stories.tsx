import React from "react";
import { MemoryRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { NFTsSpreadSheetViewer, NFTsSpreadSheetViewerProps } from "./NFTsSpreadSheetViewer";
const args: NFTsSpreadSheetViewerProps = {
  nftContract: nftContractList[0],
  metadataList,
  mintedTokenIds: [],
  deployed: false,
  setState: () => {
    console.log("set state");
  },
};

export default {
  title: "Organisms/NFTsSpreadSheetViewer",
  component: NFTsSpreadSheetViewer,
  args,
};

export const Control: React.FC<NFTsSpreadSheetViewerProps> = (props) => (
  <MemoryRouter>
    <RecoilRoot>
      <NFTsSpreadSheetViewer {...props}>{props.children}</NFTsSpreadSheetViewer>
    </RecoilRoot>
  </MemoryRouter>
);
