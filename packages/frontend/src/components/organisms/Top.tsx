import { Heading, Box, Stack, Button, Text, LightMode, Link } from "@chakra-ui/react";
import React from "react";
import { analytics } from "../../modules/firebase";

export const Top: React.FC = () => {
  const onClickMypage = () => {
    analytics.logEvent("click", {
      type: "button",
      name: "mypage",
    });
  };

  return (
    <Box as="section" bg="teal.600" color="white" py="7.5rem">
      <Box maxW={{ base: "xl", md: "5xl" }} mx="auto" px={{ base: "6", md: "8" }}>
        <Box textAlign="center">
          <Heading
            as="h1"
            size="3xl"
            fontWeight="extrabold"
            maxW="48rem"
            mx="auto"
            lineHeight="1.2"
            letterSpacing="tight"
          >
            Mint your own NFTs!!
          </Heading>
          <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
            Best tools for creators who wants to create their NFT collection is here.
          </Text>
        </Box>

        <Stack justify="center" direction={{ base: "column", md: "row" }} mt="10" mb="10" spacing="4">
          <LightMode>
            <Link href="/mypage">
              <Button onClick={onClickMypage} size="lg" px="12" colorScheme={"yellow"} fontWeight="bold" fontSize="md">
                Get started
              </Button>
            </Link>
          </LightMode>
        </Stack>
      </Box>
    </Box>
  );
};
