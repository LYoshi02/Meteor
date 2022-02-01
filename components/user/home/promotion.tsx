import { Box, Flex, Stack, Text } from "@chakra-ui/react";

import { PromotionSchema } from "../../../types";
import { addMonths, formateDateToFullDate } from "../../../utils/dateHelpers";

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
          <Box as="dt" minWidth="32">
            Nro de Promoción
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            {props.promotion.NroPromocion}
          </Box>
        </Flex>

        <Flex as="dl" direction={{ base: "column", sm: "row" }}>
          <Box as="dt" minWidth="32">
            Descuento
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            {props.promotion.PorcentajeDto}%
          </Box>
        </Flex>

        <Flex as="dl" direction={{ base: "column", sm: "row" }}>
          <Box as="dt" minWidth="32">
            Fecha de Fin
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            {formateDateToFullDate(
              addMonths(props.contractStartDate, props.promotion.Duracion)
            )}
          </Box>
        </Flex>
      </Stack>
    </>
  );
};

export default Promotion;
