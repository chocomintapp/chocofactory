import { Heading, Box, Stack, Flex, Button, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

export default function AboutChoco() {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={"img/background.jpeg"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-t, blackAlpha.400, transparent)"}
      >
        <Stack as={Box} textAlign={"center"} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading
            color="white"
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            textShadow={"1px 1px #696969"}
          >
            About Chocomint <br />
          </Heading>
          <Text color={"white"} fontWeight="bold">
            Chocomint is a decentralized multi-chain NFTs platform. It has three core functions; NFT Minter, NFT
            Marketplace, NFTIndexer. Each function is independent and can be used for different purposes. I will explain
            them in detail now.
          </Text>
          <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
            Learn more
          </Button>
        </Stack>
      </VStack>
    </Flex>
  );
}
