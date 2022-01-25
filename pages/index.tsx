import { Box, Container, Flex } from "@chakra-ui/react";

import Header from "../components/home/header";
import Steps from "../components/home/steps";
import Navigation from "../components/navigation/navigation";

function HomePage() {
  return (
    <Box bgGradient="linear(to-br, #000000, #152331 85%)" overflow="hidden">
      <Container maxW="container.xl">
        <Flex minH="100vh" direction="column">
          <Navigation />
          <Header />
        </Flex>
        <Steps />
      </Container>
    </Box>
  );
}

export default HomePage;
