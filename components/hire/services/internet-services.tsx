import { UseFormRegister } from "react-hook-form";
import { Box, Heading } from "@chakra-ui/layout";
import { Radio, RadioGroup } from "@chakra-ui/radio";
import { Stack } from "@chakra-ui/react";

import { ServicesFormValues, InternetService } from "../../../types";
import { formatPrice } from "../../../util/helpers";

type Props = {
  services: InternetService[] | undefined;
  register: UseFormRegister<ServicesFormValues>;
  serviceSelected: string;
};

const InternetServices = (props: Props) => {
  const internetServices = props.services?.map((service: InternetService) => (
    <Radio
      key={service.nroServicio}
      value={service.nroServicio.toString()}
      isFullWidth
      {...props.register("internet")}
    >
      {service.nombre} {`(${formatPrice(service.precio)})`}
    </Radio>
  ));

  return (
    <Box>
      <Heading variant="h3" size="lg" mb="2">
        Internet
      </Heading>
      <RadioGroup value={props.serviceSelected}>
        <Stack spacing={1}>{internetServices}</Stack>
      </RadioGroup>
    </Box>
  );
};

export default InternetServices;
