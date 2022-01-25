import { Box, Button, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import rocketSvg from "../../assets/svgs/rocket.svg";
import Container from "../ui/container";
import Link from "../ui/link";

const Header = () => {
  return (
    <Container
      config={{
        as: "header",
        alignContent: "center",
        flex: "1",
      }}
    >
      <Box
        position="absolute"
        transform="rotate(325deg)"
        opacity="0.08"
        top="0"
        left="0"
      >
        <Image src={rocketSvg} alt="Rocket" />
      </Box>
      <Heading
        as="h1"
        fontSize="6xl"
        textAlign="center"
        color="white"
        gridColumn="2 / 12"
      >
        Llevá tu velocidad de conexión al espacio
      </Heading>
      <Text
        fontSize="2xl"
        mt="6"
        textAlign="center"
        color="gray.200"
        gridColumn="3 / 11"
      >
        Ofrecemos servicios de internet y cable para que te mantengas conectado
        en todo momento
      </Text>
      <Button
        mt="14"
        fontSize="lg"
        h="12"
        bgGradient="linear(to-r, #EC008C, #FC6767)"
        _hover={{}}
        gridColumn="6 / 8"
      >
        <Link href="/hire" styles={{ _hover: {} }}>
          Contratar Ahora
        </Link>
      </Button>
    </Container>
  );
};

export default Header;
