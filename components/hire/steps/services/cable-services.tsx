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

import { ServicesFormValues, CableService } from "../../../../types";

type Props = {
  services: { required: CableService[]; optional: CableService[] } | undefined;
  register: UseFormRegister<ServicesFormValues>;
  selectedServices: { required: string; optional: string[] };
};

const CableServices = (props: Props) => {
  const requiredServices = props.services?.required.map((service) => (
    <Radio
      key={service.NroServicio}
      value={service.NroServicio.toString()}
      {...props.register("cable.required")}
    >
      {service.Nombre} {`($${service.Precio})`}
    </Radio>
  ));

  const optionalServices = props.services?.optional.map((service, index) => (
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
      <Heading variant="p" size="md" my="2" fontWeight="normal">
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
