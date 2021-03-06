import { Box, SimpleGrid, VStack, Heading, Text } from "@chakra-ui/react";
import * as React from "react";
import { FcPrivacy, FcNoIdea, FcRightDown } from "react-icons/fc";
import { GiMeshNetwork } from "react-icons/gi";
import { Feature } from "./Feature";

export const ChocoV1 = () => (
  <VStack mt={"50px"}>
    <Heading fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}>What is Chocomint ?</Heading>
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
        <Feature title="No skills required" icon={<FcNoIdea />}>
          Even if you don&apos;t have a programming skill, you can create the NFTs easily.
        </Feature>
        <Feature title="Support multi-chain" icon={<GiMeshNetwork />}>
          Chocomint will support multi-chain so that users can enjoy NFT with their favorite chains.
        </Feature>
      </SimpleGrid>
    </Box>
  </VStack>
);
