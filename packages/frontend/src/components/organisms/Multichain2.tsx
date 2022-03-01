import {
  Container,
  SimpleGrid,
  HStack,
  Image,
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

const features = [
  {
    id: 1,
    title: "Ethereum",
    imgSrc: "img/ethereum_logo.png",
  },
  {
    id: 2,
    title: "Polygon",
    imgSrc: "img/polygon_logo.png",
  },
  {
    id: 3,
    title: "BSC",
    imgSrc: "img/bsc_logo.png",
  },
  {
    id: 4,
    title: "Astar",
    imgSrc: "img/astar_logo.jpeg",
  },
  {
    id: 5,
    title: "Aurora",
    imgSrc: "img/aurora_logo.png",
  },
  {
    id: 6,
    title: "Shiden",
    imgSrc: "img/shiden_logo.jpeg",
  },
  {
    id: 7,
    title: "Avalanch",
    imgSrc: "img/avalanch_logo.png",
  },
  {
    id: 8,
    title: "Fantom",
    imgSrc: "img/fantom_logo.png",
  },
];

export default function Multichain2() {
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
        <Stack spacing={4} as={Container} maxW={"8xl"} textAlign={"center"}>
          <Heading
            color="white"
            fontWeight={"bold"}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            textShadow={"1px 1px #696969"}
          >
            Support Multi-Chains <br />
          </Heading>
          <Text color={"gray.600"} fontSize={"xl"} fontWeight={"bold"}>
            We support multi-chain so that users can enjoy NFT with their favorite chains.
          </Text>
        </Stack>

        <Container maxW={"5xl"} mt={10} mb={10} p={10} background="#C9EEE1" borderRadius="3xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {features.map((feature) => (
              <HStack key={feature.id} align={"top"} m={"auto"}>
                <VStack textAlign={"center"}>
                  <Text fontWeight={600} fontSize={"2xl"}>
                    {feature.title}
                  </Text>
                  <Image borderRadius="full" boxSize={"100"} src={feature.imgSrc}></Image>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </Container>
      </VStack>
    </Flex>
  );
}
