import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import rocketSvg from "../../assets/svgs/rocket.svg";
import Container from "../ui/container";
import Link from "../ui/link";

const Header = () => {
  return (
    <Flex as="header" flex="1" alignItems="center">
      <Box
        position="absolute"
        transform="rotate(325deg)"
        opacity="0.08"
        top="0"
        left="0"
        zIndex="0"
        w={{ base: "0", sm: "64", md: "96", lg: "md" }}
      >
        <Image src={rocketSvg} alt="Rocket" width={479} height={686} priority />
      </Box>
      <Container config={{ zIndex: "100" }}>
        <Heading
          as="h1"
          fontSize={{ base: "4xl", sm: "5xl", md: "6xl" }}
          textAlign="center"
          color="white"
          gridColumn={{ base: "1 / -1", md: "2 / 12" }}
        >
          Llevá tu velocidad de conexión al espacio
        </Heading>
        <Text
          fontSize={{ base: "kg", sm: "xl", md: "2xl" }}
          mt="6"
          textAlign="center"
          color="gray.200"
          gridColumn={{ base: "1 / -1", md: "3 / 11" }}
        >
          Ofrecemos servicios de internet y cable para que te mantengas
          conectado en todo momento
        </Text>
        <Box
          gridColumn="1 / -1"
          mt={{ base: "10", md: "14" }}
          textAlign="center"
        >
          <Button
            fontSize="lg"
            h="12"
            bgGradient="linear(to-r, #EC008C, #FC6767)"
            _hover={{}}
          >
            <Link href="/hire" styles={{ _hover: {} }}>
              Contratar Ahora
            </Link>
          </Button>
        </Box>
      </Container>
    </Flex>
  );
};

export default Header;
