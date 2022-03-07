import { Heading, Box, Stack, Flex, Button, Text, VStack, useBreakpointValue } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { analytics } from "../../modules/firebase";
import { openWindow } from "../utils/hooks";

export const Top: React.FC = () => {
  const onClickMypage = () => {
    analytics.logEvent("click", {
      type: "button",
      name: "mypage",
    });
  };

  return (
    <Flex
      w={"full"}
      h={"100vh"}
      backgroundImage={"img/back3.png"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        // bgGradient={"linear(blackAlpha.400, transparent)"}
      >
        <Stack as={Box} textAlign={"center"} spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading
            color="black"
            fontWeight={600}
            fontSize={{ base: "4xl", sm: "4xl", md: "8xl" }}
            lineHeight={"110%"}
            textShadow={"1px 1px #696969"}
          >
            Mint your NFTs!!
          </Heading>
          <Text color={"black"} fontWeight="bold" fontSize={"2xl"} textShadow={"#26CD97 1px 0 10px"}>
            Create your own NFTs with the world&apos;s most decentralized NFT minting system!
          </Text>
          <Stack direction={"column"} spacing={3} align={"center"} alignSelf={"center"} position={"relative"}>
            <Link to="/mypage" onClick={onClickMypage}>
              <Button
                color={"white"}
                bg={"#008080"}
                rounded={"full"}
                _hover={{
                  opacity: 0.5,
                }}
                _focus={{ _focus: "none" }}
                size="lg"
                shadow={"2xl"}
                textShadow={"0.2px 0.2px #000000"}
                // border={"2px"}
                // borderColor={"white"}
              >
                Launch App
              </Button>
            </Link>
            <Button
              variant={"link"}
              colorScheme={"blue"}
              size={"sm"}
              onClick={() => openWindow("https://docs.chocomint.app/")}
            >
              Docs
            </Button>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
};
