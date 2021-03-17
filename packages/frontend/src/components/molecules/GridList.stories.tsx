import React from "react";
import { MemoryRouter } from "react-router-dom";
import { nftContractList, metadataList } from "../../__fixtures__/mock.stories.json";
import { GridList, GridListProps } from "./GridList";

const args: GridListProps = {
  nftContract: nftContractList[0],
  metadataList,
};

export default {
  title: "Molecules/GridList",
  component: GridList,
  args,
};

export const Control: React.FC<GridListProps> = (props) => (
  <MemoryRouter>
    <GridList {...props}>{props.children}</GridList>
  </MemoryRouter>
);
