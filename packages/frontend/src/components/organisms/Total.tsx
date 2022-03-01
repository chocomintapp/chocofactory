import { Box, chakra, SimpleGrid, Stat, StatLabel, StatNumber, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract, ContractCountsForChainId } from "../../types";
import { Container } from "../atoms/Container";
import { NFTsInfoViewer } from "../organisms/NFTsInfoViewer";

interface StatsCardProps {
  title: string;
  stat: string;
}

export interface TotalTemplateProps {
  nftContractList: NFTContract[];
  contractCountsForChainId: ContractCountsForChainId[];
}

function StatsCard(props: StatsCardProps) {
  const { title, stat } = props;
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"2px solid"}
      borderColor={"#26CD97"}
      rounded={"lg"}
      background={"white"}
      color="#26CD97"
    >
      <StatLabel fontWeight={"medium"} isTruncated>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
}

export const Total: React.FC<TotalTemplateProps> = ({ nftContractList, contractCountsForChainId }) => {
  return (
    <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1 textAlign={"center"} fontSize={"4xl"} py={10} fontWeight={"bold"}>
        Total Projects Created
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={{ base: 5, lg: 8 }}>
        {contractCountsForChainId.map((counts, i) => {
          return (
            <h3 key={i} className="text-center text-gray-600 font-bold m-4">
              <StatsCard title={getNetworkNameFromChainId(counts.chainId)} stat={counts.count.toString()} />
            </h3>
          );
        })}
      </SimpleGrid>
      <Container type="wide">
        <NFTsInfoViewer nftContractList={nftContractList} />
      </Container>
    </Box>
  );
};
