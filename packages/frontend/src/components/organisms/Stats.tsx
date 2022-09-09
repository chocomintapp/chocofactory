import { Box, Container, Heading, SimpleGrid, Stack, Text, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

export const Stats: React.FC = () => {
  const stats = [
    {
      value: "1500+",
      label: "Contracts Created",
    },
    {
      value: "130k+",
      label: "Tokens Created",
    },
    {
      value: "3min",
      label: "to create your NFT project",
    },
  ];
  return (
    <Box bg="teal.600" color="white">
      <Container py={{ base: "16", md: "24" }} maxW="3xl">
        <Stack spacing={{ base: "12", md: "16" }} textAlign="center" align="center">
          <Stack spacing={{ base: "4", md: "5" }}>
            <Heading size={useBreakpointValue({ base: "md", md: "lg" })}>Why Chocomint?</Heading>
            <Text fontSize={{ base: "lg", md: "xl" }} color="muted">
              Because this simple tools will help your project to create value instantly.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, md: 3 }} rowGap="8">
            {stats.map((stat) => (
              <>
                <Stack spacing="3" textAlign="center">
                  <Heading size={useBreakpointValue({ base: "lg", md: "2xl" })}>{stat.value}</Heading>
                  <Text fontSize="lg" fontWeight="medium" color="muted">
                    {stat.label}
                  </Text>
                </Stack>
              </>
            ))}
          </SimpleGrid>
        </Stack>
        <Box bg={"white"} mt="12">
          <iframe
            src="https://dune.com/embeds/704618/1301954/7d7880d5-feb3-4916-8ab3-8a5d8f3ce6e7"
            width="100%"
            height="300px"
          ></iframe>
        </Box>
      </Container>
    </Box>
  );
};
