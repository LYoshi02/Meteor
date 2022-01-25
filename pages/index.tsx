import { Box } from "@chakra-ui/react";

import Hero from "../components/home/hero";
import Steps from "../components/home/steps";
import Feature from "../components/home/feature";

function HomePage() {
  return (
    <>
      <Box bgGradient="linear(to-br, #000000, #152331 85%)" overflow="hidden">
        <Hero />
        <Steps />
      </Box>
      <Feature />
    </>
  );
}

export default HomePage;
