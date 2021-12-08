import NextLink from "next/link";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";

const navigationItems = [
  { path: "/", name: "Inicio" },
  { path: "/hire", name: "Contratar Servicios" },
];

const Navigation = () => {
  return (
    <Flex bgColor="teal.500" px="4" py="2" justifyContent="space-between">
      <Heading as="h1" size="md">
        <Link href="/">Bases de Datos</Link>
      </Heading>
      <Box as="nav">
        <Box as="ul" d="flex">
          {navigationItems.map(({ path, name }) => (
            <Box key={path} as="li" listStyleType="none" mr="4">
              <NextLink href={path} passHref>
                <Link fontSize="lg">{name}</Link>
              </NextLink>
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default Navigation;
