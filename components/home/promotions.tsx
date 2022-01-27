import { Box, Flex, Heading } from "@chakra-ui/react";

import Container from "../ui/container";
import Promotion from "./promotions/promotion";

const Promotions = () => {
  return (
    <Box as="section" bgColor="#0B0D17" py="48">
      <Container>
        <Box textAlign="center" gridColumn="1 / -1">
          <Heading as="h2" fontSize={{ base: "4xl", md: "5xl" }}>
            Nuestras Promociones
          </Heading>
        </Box>
        <Flex
          mt="24"
          gridColumn={{ base: "1 / -1", md: "2 / 12", lg: "1 / -1" }}
          gridGap={{ base: "24", lg: "12" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          <Promotion />
          <Promotion mostPopular />
          <Promotion />
        </Flex>
      </Container>
    </Box>
  );
};

export default Promotions;
