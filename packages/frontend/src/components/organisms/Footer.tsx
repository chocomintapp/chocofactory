import { Box, chakra, Container, Stack, Text, useColorModeValue, VisuallyHidden } from "@chakra-ui/react";
import { ReactNode } from "react";
import React from "react";
import { FaTwitter, FaMedium, FaDiscord } from "react-icons/fa";

const SocialButton = ({ children, label, href }: { children: ReactNode; label: string; href: string }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      href={href}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

export const Footer: React.FC = () => {
  return (
    <Box bg={useColorModeValue("gray.50", "gray.900")} color={useColorModeValue("gray.700", "gray.200")}>
      <Container
        as={Stack}
        maxW={"6xl"}
        py={4}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text>© 2022 BlockBase,Inc. All rights reserved</Text>
        <Stack direction={"row"} spacing={6}>
          <SocialButton label={"Twitter"} href={"https://twitter.com/chocomintapp"}>
            <FaTwitter />
          </SocialButton>
          <SocialButton label={"Discord"} href={"https://discord.com/invite/UMcFBDfPa8"}>
            <FaDiscord />
          </SocialButton>
          <SocialButton label={"Medium"} href={"https://medium.com/@Chocomintapp"}>
            <FaMedium />
          </SocialButton>
        </Stack>
      </Container>
    </Box>
  );
};
