import {
  Box,
  Button,
  Checkbox,
  Divider,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";

import { Services } from "../../types";

type Props = {
  setPrevStep: () => void;
  services: Services | undefined;
};

const ServicesForm = (props: Props) => {
  const internetServices = props.services?.internet.map((service) => (
    <Radio key={service.nroServicio} value={service.nroServicio}>
      {service.nombre}
    </Radio>
  ));

  const tvServices = props.services?.cable.map((service) => (
    <Checkbox key={service.nroServicio}>{service.nombre}</Checkbox>
  ));

  return (
    <Stack spacing={4}>
      <Text fontSize="lg" fontWeight="bold">
        2) Seleccione sus servicios:
      </Text>
      <Box>
        <Heading variant="h3" size="lg">
          Internet
        </Heading>
        <RadioGroup>{internetServices}</RadioGroup>
      </Box>
      <Divider />
      <Box>
        <Heading variant="h3" size="lg">
          Cable
        </Heading>
        {tvServices}
      </Box>
      <Box mt="4">
        <Button
          type="button"
          variant="outline"
          colorScheme="teal"
          width={{ sm: "full", md: "auto" }}
          mr="2"
          onClick={props.setPrevStep}
        >
          Anterior
        </Button>
        <Button
          type="submit"
          colorScheme="teal"
          width={{ sm: "full", md: "auto" }}
        >
          Enviar
        </Button>
      </Box>
    </Stack>
  );
};

export default ServicesForm;
