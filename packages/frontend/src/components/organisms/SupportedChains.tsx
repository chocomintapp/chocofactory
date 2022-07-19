import { Container, SimpleGrid, Image, Stack, Text, Center } from "@chakra-ui/react";
import React from "react";
import { chainsDetails } from "../utils/materials";

export const SupportedChains: React.FC = () => {
  return (
    <Container py={{ base: "12", md: "16" }} maxW="3xl">
      <Stack spacing="8">
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="medium" color="muted" textAlign="center">
          Supported chains
        </Text>
        <SimpleGrid gap={{ base: "4", md: "8" }} columns={{ base: 2, md: 3, lg: 4 }}>
          {chainsDetails.map((chain) => (
            <Center key={chain.title} my="2">
              <Image src={chain.imgSrc} h={{ base: "8", md: "12" }} maxW="180px" fill="emphasized" />
              <Text ml="2" fontWeight="semibold">
                {chain.title}
              </Text>
            </Center>
          ))}
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
