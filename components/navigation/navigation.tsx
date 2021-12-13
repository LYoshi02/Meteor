import { Box, Flex, Heading } from "@chakra-ui/react";

import Link from "../ui/link";
import useUser from "../../hooks/useUser";

const navigationItemsWithAuth = [
  { path: "/", name: "Inicio" },
  { path: "/user/logout", name: "Cerrar Sesión" },
];

const navigationItemsWithoutAuth = [
  { path: "/", name: "Inicio" },
  { path: "/hire", name: "Contratar Servicios" },
  { path: "/user/login", name: "Iniciar Sesión" },
];

const Navigation = () => {
  const { user } = useUser({});

  let navigationItems = navigationItemsWithoutAuth;
  if (user?.isLoggedIn) {
    navigationItems = navigationItemsWithAuth;
  }

  return (
    <Flex bgColor="teal.500" px="4" py="2" justifyContent="space-between">
      <Heading as="h1" size="md">
        <Link href="/">Bases de Datos</Link>
      </Heading>
      <Box as="nav">
        <Box as="ul" d="flex">
          {navigationItems.map(({ path, name }) => (
            <Box key={path} as="li" listStyleType="none" mr="4">
              <Link href={path} styles={{ fontSize: "lg" }}>
                {name}
              </Link>
            </Box>
          ))}
        </Box>
      </Box>
    </Flex>
  );
};

export default Navigation;
