import { Box, Flex, Heading } from "@chakra-ui/react";

import Container from "../ui/container";
import Promotion from "./promotions/promotion";

const Promotions = () => {
  return (
    <Box as="section" bgColor="#0B0D17" py="48">
      <Container>
        <Box textAlign="center" gridColumn="1 / -1">
          <Heading as="h2" fontSize="5xl">
            Nuestras Promociones
          </Heading>
        </Box>
        <Flex py="24" gridColumn="1 / -1" gridGap="12">
          <Promotion />
          <Promotion mostPopular />
          <Promotion />
        </Flex>
      </Container>
    </Box>
  );
};

export default Promotions;
