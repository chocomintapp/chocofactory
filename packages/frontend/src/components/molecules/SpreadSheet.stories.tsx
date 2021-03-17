import React from "react";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { SpreadSheet, SpreadSheetProps } from "./SpreadSheet";

const args: SpreadSheetProps = {
  chainId: nftContractList[0].chainId,
  nftContractAddress: nftContractList[0].nftContractAddress,
  metadataList,
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
