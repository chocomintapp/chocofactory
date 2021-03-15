import React from "react";
import { nfts } from "../../__fixtures__/mock.stories.json";
import { SpreadSheet, SpreadSheetProps } from "./SpreadSheet";

const args: SpreadSheetProps = {
  metadataList: nfts,
};

export default {
  title: "Molecules/SpreadSheet",
  component: SpreadSheet,
  args,
};

export const Control: React.FC<SpreadSheetProps> = (props) => <SpreadSheet {...props}>{props.children}</SpreadSheet>;
