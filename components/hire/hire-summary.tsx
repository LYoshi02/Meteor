import { Box, Heading, Text } from "@chakra-ui/layout";

import ServicesTable from "./summary/services-table";
import { formatPrice } from "../../util/helpers";
import {
  CableService,
  InternetService,
  Services,
  ServicesFormValues,
} from "../../types";
import { Button } from "@chakra-ui/button";

type Props = {
  services: Services | undefined;
  selectedServices: ServicesFormValues | undefined;
  onSetPrevStep: () => void;
};

const HireSummary = (props: Props) => {
  const selectedServicesDetails: (CableService | InternetService)[] = [];

  if (props.selectedServices?.cable) {
    props.selectedServices.cable.forEach((id) => {
      const service = props.services?.cable.find(
        (s) => s.nroServicio.toString() === id
      );
      if (service) {
        selectedServicesDetails.push(service);
      }
    });
  }

  if (props.selectedServices?.internet) {
    const service = props.services?.internet.find(
      (service) =>
        service.nroServicio.toString() === props.selectedServices?.internet
    );
    if (service) {
      selectedServicesDetails.push(service);
    }
  }

  const subtotal = selectedServicesDetails.reduce(
    (prevValue, currentValue) => prevValue + currentValue.precio,
    0
  );
  console.log(subtotal);

  return (
    <Box>
      <Heading variant="h3" size="lg" mb="2">
        Resumen
      </Heading>
      <ServicesTable selectedServices={selectedServicesDetails} />
      <Text fontSize="lg" mt="2">
        Subtotal: {formatPrice(subtotal)}
      </Text>
      <Box mt="4">
        <Button
          type="button"
          variant="outline"
          colorScheme="teal"
          width={{ sm: "full", md: "auto" }}
          mr="2"
          onClick={props.onSetPrevStep}
        >
          Anterior
        </Button>
        <Button
          type="button"
          colorScheme="teal"
          width={{ sm: "full", md: "auto" }}
        >
          Finalizar
        </Button>
      </Box>
    </Box>
  );
};

export default HireSummary;
