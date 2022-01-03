import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { format, addMonths } from "date-fns";

import { PromotionSchema } from "../../../types";

type Props = {
  promotion: PromotionSchema;
  contractStartDate: string;
};

const Promotion = (props: Props) => {
  return (
    <>
      <Text fontWeight="medium" fontSize="xl">
        Promoción
      </Text>

      <Stack spacing="4" mt="4">
        <Flex as="dl" direction={{ base: "column", sm: "row" }}>
          <Box as="dt" minWidth="40">
            Nro de Promoción
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            {props.promotion.NroPromocion}
          </Box>
        </Flex>

        <Flex as="dl" direction={{ base: "column", sm: "row" }}>
          <Box as="dt" minWidth="40">
            Descuento
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            {props.promotion.PorcentajeDto}%
          </Box>
        </Flex>

        <Flex as="dl" direction={{ base: "column", sm: "row" }}>
          <Box as="dt" minWidth="40">
            Fecha de Fin
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            {format(
              addMonths(
                new Date(props.contractStartDate),
                props.promotion.Duracion
              ),
              "dd/MM/yyyy"
            )}
          </Box>
        </Flex>
      </Stack>
    </>
  );
};

export default Promotion;
