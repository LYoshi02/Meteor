import NextLink from "next/link";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";

const Navigation = () => {
  return (
    <Flex bgColor="teal.500" px="4" py="2" justifyContent="space-between">
      <Heading as="h1" size="md">
        <Link href="/">Bases de Datos</Link>
      </Heading>
      <Box as="nav">
        <Box as="ul" d="flex">
          <Box as="li" listStyleType="none" mr="4">
            <NextLink href={"/"} passHref>
              <Link fontSize="lg">Inicio</Link>
            </NextLink>
          </Box>
          <Box as="li" listStyleType="none">
            <NextLink href={"/hire"} passHref>
              <Link fontSize="lg">Contratar Servicios</Link>
            </NextLink>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default Navigation;
