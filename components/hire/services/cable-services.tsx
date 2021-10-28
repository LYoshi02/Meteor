import { UseFormRegister } from "react-hook-form";
import {
  Box,
  Checkbox,
  CheckboxGroup,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";

import { ServicesFormValues, CableService } from "../../../types";

type Props = {
  services: CableService[] | undefined;
  register: UseFormRegister<ServicesFormValues>;
  selectedServices: { required: string; optional: string[] };
};

const CableServices = (props: Props) => {
  const requiredServicesArray: CableService[] = [],
    optionalServicesArray: CableService[] = [];

  props.services?.forEach((service) => {
    if (service.Opcional) {
      optionalServicesArray.push(service);
    } else {
      requiredServicesArray.push(service);
    }
  });

  const requiredServices = requiredServicesArray.map((service) => (
    <Radio
      key={service.NroServicio}
      value={service.NroServicio.toString()}
      {...props.register("cable.required")}
    >
      {service.Nombre} {`($${service.Precio})`}
    </Radio>
  ));

  const optionalServices = optionalServicesArray.map((service) => (
    <Checkbox
      key={service.NroServicio}
      value={service.NroServicio.toString()}
      {...props.register("cable.optional")}
    >
      {service.Nombre} {`($${service.Precio})`}
    </Checkbox>
  ));

  return (
    <Box>
      <Heading variant="h3" size="lg" mb="2">
        Cable
      </Heading>
      <RadioGroup value={props.selectedServices.required}>
        <Stack spacing={1}>{requiredServices}</Stack>
      </RadioGroup>
      <Heading variant="h4" size="md" my="2" fontWeight="normal">
        Packs (opcionales)
      </Heading>
      <CheckboxGroup
        value={props.selectedServices.optional}
        isDisabled={!props.selectedServices.required}
      >
        <Stack spacing={1}>{optionalServices}</Stack>
      </CheckboxGroup>
    </Box>
  );
};

export default CableServices;
