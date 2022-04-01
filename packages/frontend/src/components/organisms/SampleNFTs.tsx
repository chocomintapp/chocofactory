import { Flex, Spacer } from "@chakra-ui/react";
import React from "react";
import { SampleNFT1 } from "../molecules/SampleNFT1";
import { SampleNFT2 } from "../molecules/SampleNFT2";
import { SampleNFT3 } from "../molecules/SampleNFT3";

export const SampleNFTs: React.FC = () => {
  return (
    <Flex>
      <Spacer />
      <SampleNFT1 />
      <Spacer />
      <SampleNFT2 />
      <Spacer />
      <SampleNFT3 />
      <Spacer />
    </Flex>
  );
};
