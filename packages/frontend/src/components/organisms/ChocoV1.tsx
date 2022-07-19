import { Box, SimpleGrid, Heading, Text, Stack, useBreakpointValue, Square, Icon, Container } from "@chakra-ui/react";
import * as React from "react";
import { FcPrivacy, FcNoIdea, FcRightDown } from "react-icons/fc";
import { GiMeshNetwork } from "react-icons/gi";

export const ChocoV1: React.FC = () => {
  const features = [
    {
      name: "Own Contract",
      icon: FcPrivacy,
      description: "The creator is the Owner and has control of the NFT contract, thus it is platform-independent.",
    },
    {
      name: "Minimum Gas",
      icon: FcRightDown,
      description:
        "The NFT can be created with a small gas fee due to the high gas efficiency of the contract with the proxy pattern.",
    },
    {
      name: "No skills required",
      icon: FcNoIdea,
      description: "You can create the NFTs without coding.",
    },
    {
      name: "Multi-chain",
      icon: GiMeshNetwork,
      description: "Chocomint will support multi-chain so that users can enjoy NFT with their favorite chains.",
    },
  ];
  return (
    <Box as="section" bg="bg-surface">
      <Container py={{ base: "16", md: "24" }} maxW="3xl">
        <Stack spacing={{ base: "12", md: "16" }}>
          <Stack spacing={{ base: "4", md: "5" }} align="center" textAlign="center">
            <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>Features</Heading>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 2 }} columnGap={8} rowGap={{ base: 10, md: 16 }}>
            {features.map((feature) => (
              <Stack key={feature.name} spacing={{ base: "4", md: "5" }} align="center" textAlign="center">
                <Square size={{ base: "10", md: "12" }} bg="gray.200" color="inverted" borderRadius="lg">
                  <Icon as={feature.icon} boxSize={{ base: "5", md: "6" }} />
                </Square>
                <Stack spacing={{ base: "1", md: "2" }}>
                  <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="medium">
                    {feature.name}
                  </Text>
                  <Text color="muted">{feature.description}</Text>
                </Stack>
              </Stack>
            ))}
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};
