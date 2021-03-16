import React from "react";
import { nftContractList } from "../../__fixtures__/mock.stories.json";
import { NFTCard, NFTCardProps } from "./NFTCard";

const args: NFTCardProps = {
  nftContract: nftContractList[0],
};

export default {
  title: "Molecules/NFTCard",
  component: NFTCard,
  args,
};

export const Control: React.FC<NFTCardProps> = (props) => <NFTCard {...props}>{props.children}</NFTCard>;
