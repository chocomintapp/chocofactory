import {
  Container,
  SimpleGrid,
  HStack,
  Image,
  Heading,
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import React from "react";
import { chainsDetails } from "../utils/materials";

export const Multichain: React.FC = () => {
  return (
    <Flex
      w={"full"}
      h={"80vh"}
      backgroundImage={"img/back2.jpeg"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <VStack
        w={"full"}
        justify={"center"}
        px={useBreakpointValue({ base: 4, md: 8 })}
        // bgGradient={"linear(to-t, blackAlpha.400, transparent)"}
      >
        <Stack spacing={4} as={Container} maxW={"8xl"} textAlign={"center"}>
          <Heading
            color="black"
            fontWeight={"bold"}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
            textShadow={"1px 1px #696969"}
            mb={20}
          >
            Supported Chains <br />
          </Heading>
        </Stack>

        <Container maxW={"5xl"} mt={10} mb={10} p={10} background="#f0f8ff" borderRadius="3xl">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {chainsDetails.map((chainsDetail) => (
              <HStack key={chainsDetail.id} align={"top"} m={"auto"}>
                <VStack textAlign={"center"}>
                  <Text fontWeight={600} fontSize={"2xl"} color={"#black"}>
                    {chainsDetail.title}
                  </Text>
                  <Image borderRadius="full" boxSize={"100"} src={chainsDetail.imgSrc}></Image>
                </VStack>
              </HStack>
            ))}
          </SimpleGrid>
        </Container>
      </VStack>
    </Flex>
  );
};
