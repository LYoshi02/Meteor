import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import Container from "../ui/container";
import phoneImg from "../../assets/images/phone.png";
import Link from "../ui/link";

const Feature = () => {
  return (
    <Box as="section" bgColor="gray.900" py="48">
      <Container>
        <Box gridColumn="1 / 7" alignSelf="center">
          <Heading as="h3">Administrá tu Cuenta</Heading>
          <Box fontSize="xl" mt="4">
            <Text>
              Desde nuestro panel de usuario vas a poder ver el resumen de tus
              servicios, descargar tus facturas mensuales y modificar tus datos
              personales.
            </Text>
            <Text mt="1">
              Para ingresar necesitás de un correo y una contraseña dada por el
              sistema.
            </Text>
          </Box>
          <Box mt="8">
            <Link
              href="/login"
              styles={{
                _hover: {},
                d: "inline-block",
              }}
            >
              <Flex
                bgGradient="linear(to-r, #EC008C, #FC6767)"
                bgClip="text"
                alignItems="center"
                fontWeight="medium"
              >
                <Text as="span" fontSize="2xl">
                  Ingresar
                </Text>
                <Text as="span" fontSize="4xl" lineHeight="1" ml="1">
                  &rarr;
                </Text>
              </Flex>
            </Link>
          </Box>
        </Box>
        <Box gridColumn="8 / -1" justifySelf="flex-end">
          <Image
            src={phoneImg}
            alt="User screen"
            quality={100}
            width={379}
            height={730}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Feature;
