import { Box, SimpleGrid, VStack, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { FcPrivacy, FcNoIdea, FcRightDown } from "react-icons/fc";
import { GiMeshNetwork } from "react-icons/gi";
import { Feature } from "./Feature";

export const ChocoV1 = () => (
  <VStack mt={"50px"}>
    <Heading>What is Chocomint ?</Heading>
    <Text color={"gray.500"} fontSize={"lg"}>
      Chocomint is a decentralized multi-chains NFT protocol.
    </Text>
    <Box as="section" maxW="5xl" mx="auto" py="12" px={{ base: "6", md: "8" }}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacingX="10" spacingY={{ base: "8", md: "14" }}>
        <Feature title="Own Contract" icon={<FcPrivacy />}>
          The creator is the Owner and has control of the NFT contract, thus it is platform-independent.
        </Feature>
        <Feature title="Less Gas" icon={<FcRightDown />}>
          The NFT can be created with a small gas fee due to the high gas efficiency of the contract with the proxy
          pattern.
        </Feature>
        <Feature title="No skills requied" icon={<FcNoIdea />}>
          Even if you don&apos;t have a programming skill, you can create the NFTs easily.
        </Feature>
        <Feature title="Support multi-chain" icon={<GiMeshNetwork />}>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
        </Feature>
      </SimpleGrid>
    </Box>
  </VStack>
);
