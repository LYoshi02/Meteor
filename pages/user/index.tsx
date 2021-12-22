import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";

import DashboardLayout from "../../components/layout/dashboard-layout";
import useUser from "../../hooks/useUser";

const UserPage = () => {
  const { user } = useUser({ redirectTo: "/" });

  return (
    <DashboardLayout>
      <Heading as="h2">
        Bienvenido, {user?.data?.firstName} {user?.data?.lastName}
      </Heading>
      <Grid templateColumns="repeat(8, 1fr)" mt="8" gap="4">
        <GridItem
          colSpan={3}
          bgGradient="linear(to-tl, purple.600, purple.800)"
          p="4"
          borderRadius="sm"
          shadow="sm"
        >
          <Text fontWeight="medium" fontSize="xl">
            Contrato
          </Text>

          <Stack spacing="4" mt="4">
            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Nro de Contrato
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                3
              </Box>
            </Flex>

            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Fecha de Inicio
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                12/12/2021
              </Box>
            </Flex>
          </Stack>
        </GridItem>

        <GridItem
          colSpan={5}
          rowSpan={2}
          bgGradient="linear(to-tr, red.600, red.800)"
          p="4"
          borderRadius="sm"
          shadow="sm"
        >
          <Text fontWeight="medium" fontSize="xl">
            Servicios Contratados
          </Text>

          <Stack spacing="4" mt="4">
            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Servicio 1
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                3000
              </Box>
            </Flex>

            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Servicio 2
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                3000
              </Box>
            </Flex>

            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Total
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                6000
              </Box>
            </Flex>
          </Stack>
        </GridItem>

        <GridItem
          colSpan={3}
          bgGradient="linear(to-bl, cyan.600, cyan.800)"
          p="4"
          borderRadius="sm"
          shadow="sm"
        >
          <Text fontWeight="medium" fontSize="xl">
            Promoción
          </Text>

          <Stack spacing="4" mt="4">
            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Nro de Promoción
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                3
              </Box>
            </Flex>

            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Descuento
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                30%
              </Box>
            </Flex>

            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Fecha de Inicio
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                12/12/2021
              </Box>
            </Flex>

            <Flex as="dl" direction={{ base: "column", sm: "row" }}>
              <Box as="dt" minWidth="40">
                Fecha de Fin
              </Box>
              <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
                12/12/2022
              </Box>
            </Flex>
          </Stack>
        </GridItem>
      </Grid>
    </DashboardLayout>
  );
};

export default UserPage;
