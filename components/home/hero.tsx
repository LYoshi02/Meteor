import { Flex } from "@chakra-ui/react";

import Navigation from "../layout/navigation";
import Header from "./header";

const Hero = () => {
  return (
    <Flex minH="100vh" direction="column">
      <Navigation />
      <Header />
    </Flex>
  );
};

export default Hero;
