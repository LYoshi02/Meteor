import { Box, Flex, Stack, Text } from "@chakra-ui/react";

import { ServiceSchema } from "../../../types";

type Props = {
  services: ServiceSchema[];
};

const HiredServices = (props: Props) => {
  const totalPrice = props.services.reduce(
    (prevValue, currValue) => prevValue + parseFloat(currValue.Precio),
    0
  );

  return (
    <>
      <Text fontWeight="medium" fontSize="xl">
        Servicios Contratados
      </Text>

      <Stack spacing="4" mt="4">
        {props.services.map((service) => (
          <Flex
            key={service.NroServicio}
            as="dl"
            direction={{ base: "column", sm: "row" }}
          >
            <Box as="dt" minWidth="32">
              {service.Nombre}
            </Box>
            <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
              $ {service.Precio}
            </Box>
          </Flex>
        ))}

        <Flex as="dl" direction={{ base: "column", sm: "row" }}>
          <Box as="dt" minWidth="32">
            Total
          </Box>
          <Box as="dd" flex="1" fontWeight="semibold" textAlign="right">
            $ {totalPrice.toFixed(2)}
          </Box>
        </Flex>
      </Stack>
    </>
  );
};

export default HiredServices;
