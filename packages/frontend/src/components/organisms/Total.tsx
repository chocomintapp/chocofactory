import { Box, chakra, SimpleGrid, Stat, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";
import { getNetworkNameFromChainId } from "../../modules/web3";
import { NFTContract, ContractCountsForChainId } from "../../types";

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
      color="#black"
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
    <Box maxW="8xl" p={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
        py={10}
        fontWeight={"bold"}
        color={"#black"}
      >
        Created Projects
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 5 }} spacing={{ base: 5, lg: 8 }}>
        {contractCountsForChainId.map((counts, i) => {
          {
            if (i < 5) {
              return (
                <h3 key={i} className="text-center text-gray-600 font-bold m-4">
                  <StatsCard title={getNetworkNameFromChainId(counts.chainId)} stat={counts.count.toString()} />
                </h3>
              );
            }
          }
        })}
      </SimpleGrid>

      {/* NFT Contract List */}
      {/* <Container type="wide">
        <NFTsInfoViewer nftContractList={nftContractList} />
      </Container> */}
    </Box>
  );
};
