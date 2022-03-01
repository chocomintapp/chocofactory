import { Heading, Stack, Flex, Button, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import React from "react";

export default function SNS2() {
  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={"img/black.jpeg"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
      >
        <Stack textAlign={"center"} align={"center"} spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 28 }}>
          <Heading
            color="white"
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            textShadow={"1px 1px #696969"}
          >
            Let&apos;s be a{" "}
            <Text as={"span"} color={"#4FF792"} textShadow={"1px 1px #696969"}>
              Chocominter
            </Text>
          </Heading>
          <Text color={"white"} maxW={"3xl"}>
            Join our community and be a part of Chocomint
          </Text>
          <Stack spacing={48} direction={"row"}>
            <Button
              rounded={"full"}
              px={20}
              w={60}
              color="#4FF792"
              fontWeight={"bold"}
              border="2px"
              borderColor="#4FF792"
              bg={"black"}
              size="lg"
              _hover={{ bg: "white" }}
            >
              Discord
            </Button>
            <Button
              rounded={"full"}
              px={20}
              w={60}
              color="#4FF792"
              border="2px"
              borderColor="#4FF792"
              bg={"black"}
              size="lg"
              _hover={{ bg: "white" }}
            >
              Twitter
            </Button>
          </Stack>
          <Stack spacing={48} direction={"row"}>
            <Button
              rounded={"full"}
              px={20}
              w={60}
              color="#4FF792"
              border="2px"
              borderColor="#4FF792"
              bg={"black"}
              size="lg"
              _hover={{ bg: "white" }}
            >
              Github
            </Button>
            <Button
              rounded={"full"}
              px={20}
              w={60}
              color="#4FF792"
              border="2px"
              borderColor="#4FF792"
              bg={"black"}
              size="lg"
              _hover={{ bg: "white" }}
            >
              Medium
            </Button>
          </Stack>
          <Stack spacing={48} direction={"row"}>
            <Button
              rounded={"full"}
              px={20}
              w={60}
              color="#4FF792"
              border="2px"
              borderColor="#4FF792"
              bg={"black"}
              size="lg"
              _hover={{ bg: "white" }}
            >
              Gitcoin
            </Button>
            <Button
              rounded={"full"}
              px={20}
              w={60}
              color="#4FF792"
              border="2px"
              borderColor="#4FF792"
              bg={"black"}
              size="lg"
              _hover={{ bg: "white" }}
            >
              DappRadar
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
