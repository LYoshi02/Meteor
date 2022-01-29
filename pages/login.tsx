import { Box, Heading } from "@chakra-ui/react";

import FullScreenContainer from "../components/ui/full-screen-container";
import LoginForm from "../components/login/login-form";
import MainLayout from "../components/layout/main-layout";
import useUser from "../hooks/useUser";

export default function UserLoginPage() {
  const {} = useUser({ redirectTo: "/", redirectIfFound: true });

  return (
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
  );
}
