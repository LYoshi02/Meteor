import { Box, Heading, Center } from "@chakra-ui/react";

import HireForm from "../components/hire/hire-form";

export default function HirePage() {
  return (
    <Center height="full">
      <Box width="full">
        <Heading as="h2" size="lg" textAlign="center">
          Contratar Servicio
        </Heading>
        <Box mt="4">
          <HireForm />
        </Box>
      </Box>
    </Center>
  );
}
