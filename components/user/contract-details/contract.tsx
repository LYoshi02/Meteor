import { Box, Flex, Stack, Text } from "@chakra-ui/react";

import { format } from "date-fns";

type Props = {
  contract: {
    NroContrato: number;
    FechaInicio: string;
  };
};

const Contract = (props: Props) => {
  return (
    <>
      <Text fontWeight="medium" fontSize="xl">
        Contrato
      </Text>

      <Stack spacing="4" mt="4">
        <Flex as="dl" direction={{ base: "column", sm: "row" }}>
          <Box as="dt" minWidth="32">
            Nro de Contrato
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            {props.contract.NroContrato}
          </Box>
        </Flex>

        <Flex as="dl" direction={{ base: "column", sm: "row" }}>
          <Box as="dt" minWidth="32">
            Fecha de Inicio
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            {format(new Date(props.contract.FechaInicio), "dd/MM/yyyy")}
          </Box>
        </Flex>
      </Stack>
    </>
  );
};

export default Contract;
