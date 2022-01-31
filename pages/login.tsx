import { Box, Heading } from "@chakra-ui/react";
import { NextSeo } from "next-seo";

import FullScreenContainer from "../components/ui/full-screen-container";
import LoginForm from "../components/login/login-form";
import MainLayout from "../components/layout/main-layout";
import useUser from "../hooks/useUser";

export default function UserLoginPage() {
  const {} = useUser({ redirectTo: "/", redirectIfFound: true });

  return (
    <>
      <NextSeo
        title="Iniciar Sesión"
        description="Ingresá a tu cuenta de Meteor ahora"
      />
      <MainLayout>
        <FullScreenContainer>
          <Box borderRadius="md" py="16" px="6" shadow="lg" bgColor="gray.900">
            <Heading as="h2" textAlign="center" mb="8" fontSize="3xl">
              Ingresá a tu Cuenta
            </Heading>
            <LoginForm />
          </Box>
        </FullScreenContainer>
      </MainLayout>
    </>
  );
}
