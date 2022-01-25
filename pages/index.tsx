import { Box } from "@chakra-ui/react";

import Hero from "../components/home/hero";
import Steps from "../components/home/steps";
import Feature from "../components/home/feature";
import Promotions from "../components/home/promotions";

function HomePage() {
  return (
    <>
      <Box bgGradient="linear(to-br, #000000, #152331 85%)" overflow="hidden">
        <Hero />
        <Steps />
      </Box>
      <Feature />
      <Promotions />
    </>
  );
}

export default HomePage;
