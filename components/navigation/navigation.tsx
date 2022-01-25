import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";

import Container from "../ui/container";
import Link from "../ui/link";
import useUser from "../../hooks/useUser";
import logoSvg from "../../assets/svgs/logo.svg";

const navigationItemsWithAuth = [
  { path: "/", name: "Inicio" },
  { path: "/logout", name: "Cerrar Sesión" },
];

const navigationItemsWithoutAuth = [
  { path: "/", name: "Inicio" },
  { path: "/hire", name: "Contratar Servicios" },
  { path: "/login", name: "Iniciar Sesión" },
];

const Navigation = () => {
  const { user } = useUser({});

  let navigationItems = navigationItemsWithoutAuth;
  if (user?.isLoggedIn) {
    navigationItems = navigationItemsWithAuth;
  }

  return (
    <Container>
      <Flex
        py="4"
        justifyContent="space-between"
        alignItems="center"
        gridColumn="1 / -1"
      >
        <Box>
          <Link href="/" styles={{ d: "inline-block" }}>
            <Image src={logoSvg} alt="Meteor Logo" />
          </Link>
        </Box>
        <Box as="nav">
          <Box as="ul" d="flex" gridGap="6">
            {navigationItems.map(({ path, name }) => (
              <Box key={path} as="li" listStyleType="none">
                <Link
                  href={path}
                  styles={{
                    fontSize: "lg",
                    _hover: {
                      textShadow: "0 0 1px white, 0 0 1px white, 0 0 1px white",
                    },
                    transition: ".3s all",
                    textAlign: "center",
                  }}
                >
                  {name}
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default Navigation;
