import { UseFormRegister } from "react-hook-form";
import { Box, Heading } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Stack } from "@chakra-ui/react";

import { ServicesFormValues, InternetService } from "../../../types";

type Props = {
  services: InternetService[] | undefined;
  register: UseFormRegister<ServicesFormValues>;
  selectedService: string;
};

const InternetServices = (props: Props) => {
  const internetServices = props.services?.map((service: InternetService) => (
    <Radio
      key={service.NroServicio}
      value={service.NroServicio.toString()}
      isFullWidth
      {...props.register("internet")}
    >
      {service.Nombre} {`($${service.Precio})`}
    </Radio>
  ));

  return (
    <Box>
      <Heading variant="h3" size="lg" mb="2">
        Internet
      </Heading>
      <RadioGroup value={props.selectedService}>
        <Stack spacing={1}>{internetServices}</Stack>
      </RadioGroup>
    </Box>
  );
};

export default InternetServices;
