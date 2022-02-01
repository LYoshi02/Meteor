import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import Container from "../ui/container";
import phoneImg from "../../assets/images/phone.png";
import Link from "../ui/link";

import classes from "./feature/feature.module.css";

const Feature = () => {
  return (
    <Box as="section" bgColor="gray.900" py="48">
      <Container config={{ gridRowGap: "24" }}>
        <Box
          gridColumn={{ base: "1 / -1", md: "2 / 12", lg: "1 / 7" }}
          alignSelf="center"
        >
          <Heading as="h2">Administrá tu Cuenta</Heading>
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
        <Box
          gridColumn={{ base: "1 / -1", lg: "8 / -1" }}
          justifySelf={{ base: "center", lg: "flex-end" }}
          w="full"
          h={{ base: "2xl", md: "4xl" }}
          position="relative"
        >
          <Image
            src={phoneImg}
            alt="User screen"
            layout="fill"
            objectFit="contain"
            className={classes["Image"]}
          />
        </Box>
      </Container>
    </Box>
  );
};

export default Feature;
