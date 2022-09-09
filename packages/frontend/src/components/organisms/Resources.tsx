import { Box, Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import React from "react";

export const Resources: React.FC = () => {
  const links = [
    {
      title: "Product",
      links: [
        { label: "NFTHashi", href: "https://www.nfthashi.com/" },
        // { label: "KaguraSwap", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Docs", href: "https://docs.chocomint.app" },
        { label: "Github", href: "https://github.com/chocomintapp" },
        { label: "Gitcoin", href: "https://gitcoin.co/grants/4589/chocomint" },
        { label: "DappRader", href: "https://dappradar.com/multichain/other/chocomint" },
        { label: "Dune", href: "https://dune.com/aqrare/Chocomint" },
      ],
    },
    {
      title: "Social",
      links: [
        { label: "Twitter", href: "https://twitter.com/chocomintapp" },
        { label: "Discord", href: "https://discord.com/invite/UMcFBDfPa8" },
        { label: "Medium", href: "https://medium.com/@Chocomintapp" },
      ],
    },
  ];

  return (
    <Box bg="teal.600" color="white" px={4}>
      <Stack
        justify="space-between"
        align="start"
        direction={{ base: "column", lg: "row" }}
        py={{ base: "12", md: "16" }}
        spacing="8"
      >
        <Stack spacing={{ base: "6", md: "8" }} align="start">
          {/* <Logo /> */}
          <Text color="on-accent-muted">Create NFT remarkably fast.</Text>
        </Stack>
        <SimpleGrid columns={{ base: 2, md: 3 }} gap="8" width={{ base: "full", lg: "auto" }}>
          {links.map((group, idx) => (
            <Stack key={idx} spacing="4" minW={{ lg: "40" }}>
              <Text fontSize="sm" fontWeight="semibold" color="teal.50">
                {group.title}
              </Text>
              <Stack spacing="3" shouldWrapChildren>
                {group.links.map((link, idx) => (
                  <Button key={idx} as="a" variant="gray.50" href={link.href} px="0" target="blank">
                    {link.label}
                  </Button>
                ))}
              </Stack>
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
