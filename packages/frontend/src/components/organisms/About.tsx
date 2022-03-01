import { CheckIcon } from "@chakra-ui/icons";
import {
  Container,
  SimpleGrid,
  Icon,
  HStack,
  Heading,
  Box,
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { openWindow } from "../utils/hooks";

export const About: React.FC = () => {
  const features = [
    {
      id: 1,
      title: "Own Contract",
      text: "The creator will be the Owner of the contract and can add and control Admin roles",
    },
    {
      id: 1,
      title: "Less Gas",
      text: "Perhaps one of the most gas efficient contracts with proxy pattern",
    },
    {
      id: 1,
      title: "ERC2981 Royalty standard",
      text: "Support for royalty formats in various marketplaces.",
    },
    {
      id: 1,
      title: "Easy to Airdrop",
      text: "Direct Minting of addresses other than your own is possible..",
    },
    {
      id: 1,
      title: "Can whitelist",
      text: "It is possible to create the NFTs that only whitelisted addresses can be claimed..",
    },
    {
      id: 1,
      title: "Bulk Mint",
      text: "Can mint a large number of NFTs at once.",
    },
    {
      id: 1,
      title: "No skill required",
      text: "Even if you don't have a programming skill, you can create the NFTs easily..",
    },
    {
      id: 1,
      title: "Lazy Mint",
      text: "It is possible to have the minted person pay for the gas..",
    },
  ];

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
        bgGradient={"linear(to-t, blackAlpha.600, transparent)"}
      >
        <Stack spacing={0} as={Container} maxW={"3xl"} textAlign={"center"} mb={10}>
          <Heading
            color="white"
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "3xl", md: "6xl" }}
            lineHeight={"110%"}
            textShadow={"1px 1px #696969"}
            mb={10}
          >
            About Chocomint <br />
          </Heading>
          <Text color={"white"} fontWeight="bold" fontSize={"xl"} textShadow={"#26CD97 1px 0 10px"}>
            Chocomint is a decentralized multichain NFT creating protocol.<br></br>Our goal is to create a world where
            creators are not dependent on the platform but can become the platform themselves.
          </Text>
        </Stack>

        <Container maxW={"6xl"} mt={20} background="white" p={10} borderRadius={"3xl"}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {features.map((feature) => (
              <HStack key={feature.id} align={"top"}>
                <Box color={"green.400"} px={2}>
                  <Icon as={CheckIcon} />
                </Box>
                <VStack align={"start"}>
                  <Text fontWeight={600}>{feature.title}</Text>
                  <Text color={"gray.600"}>{feature.text}</Text>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </Container>
      </VStack>
    </Flex>
  );
};
