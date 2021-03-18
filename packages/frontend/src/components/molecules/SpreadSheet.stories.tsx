import React from "react";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { SpreadSheet, SpreadSheetProps } from "./SpreadSheet";

const args: SpreadSheetProps = {
  nftContract: nftContractList[0],
  metadataList,
  mintedTokenIds: [],
  deployed: false,
  setState: () => {
    console.log("set state");
  },
};

export default {
  title: "Molecules/SpreadSheet",
  component: SpreadSheet,
  args,
};

export const Control: React.FC<SpreadSheetProps> = (props) => <SpreadSheet {...props}>{props.children}</SpreadSheet>;
