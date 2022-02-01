import { Box, Flex, Stack, Text } from "@chakra-ui/react";

import { formateDateToFullDate } from "../../../utils/dateHelpers";

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
            {formateDateToFullDate(props.contract.FechaInicio)}
          </Box>
        </Flex>
      </Stack>
    </>
  );
};

export default Contract;
