import { Box, Heading } from "@chakra-ui/react";

import FullScreenContainer from "../components/ui/full-screen-container";
import LoginForm from "../components/user/login-form";

export default function UserPage() {
  return (
    <FullScreenContainer>
      <Box borderRadius="md" py="24" px="6" shadow="lg">
        <Heading as="h2" textAlign="center" mb="8" fontSize="3xl">
          Ingresá a tu Cuenta
        </Heading>
        <LoginForm />
      </Box>
    </FullScreenContainer>
  );
}
