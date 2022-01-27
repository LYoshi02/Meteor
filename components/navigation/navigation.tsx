import { Box, Flex } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";

import Container from "../ui/container";
import Link from "../ui/link";
import useUser from "../../hooks/useUser";
import logoSvg from "../../assets/svgs/logo.svg";

const Navigation = () => {
  const { user } = useUser({});
  const router = useRouter();

  const navigationItemsWithAuth = [
    { path: "/", name: "Inicio" },
    { path: "/logout", name: "Cerrar Sesión" },
  ];

  const navigationItemsWithoutAuth = [
    { path: "/", name: "Inicio" },
    { path: "/hire", name: "Contratar Servicios" },
    { path: "/login", name: "Iniciar Sesión" },
  ];

  let navigationItems = navigationItemsWithoutAuth;
  if (user && user.isLoggedIn) {
    if (user.isAdmin) {
      navigationItemsWithAuth.splice(1, 0, {
        path: "/admin/invoices",
        name: "Administrador",
      });
    } else {
      navigationItemsWithAuth.splice(1, 0, {
        path: "/user/home",
        name: "Panel de Usuario",
      });
    }

    navigationItems = navigationItemsWithAuth;
  }

  return (
    <Container>
      <Flex
        py="4"
        justifyContent="space-between"
        alignItems="center"
        gridColumn="1 / -1"
        zIndex="100"
      >
        <Box>
          <Link href="/" styles={{ d: "inline-block" }}>
            <Image src={logoSvg} alt="Meteor Logo" />
          </Link>
        </Box>
        <Box as="nav">
          <Flex
            as="ul"
            d="flex"
            gridGap={{ base: "4", md: "6" }}
            flexDirection={{ base: "column", md: "row" }}
            alignItems="flex-end"
          >
            {navigationItems.map(({ path, name }) => (
              <Box key={path} as="li" listStyleType="none">
                <Link
                  href={path}
                  styles={{
                    fontSize: { base: "md", sm: "lg" },
                    textShadow:
                      router.pathname === path
                        ? "0 0 1px white, 0 0 1px white, 0 0 1px white"
                        : "",
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
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};

export default Navigation;
