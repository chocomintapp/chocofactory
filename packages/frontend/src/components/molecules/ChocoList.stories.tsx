import React from "react";
import { MemoryRouter } from "react-router-dom";

import { NFTContractWithMetadata } from "../../types";
import { ChocoList, ChocoListProps } from "./ChocoList";

// TODO: add test data later
const args: ChocoListProps = {
  nftContractWithMetadataList: [],
};

export default {
  title: "Molecules/ChocoList",
  component: ChocoList,
  args,
};

export const Control: React.FC<ChocoListProps> = (props) => (
  <MemoryRouter>
    <ChocoList {...props} />
  </MemoryRouter>
);
