import { useForm } from "react-hook-form";
import { Box, Button, Divider, Stack, Text } from "@chakra-ui/react";

import InternetServices from "./services/internet-services";
import { ServicesFormValues, Services } from "../../types";
import CableServices from "./services/cable-services";
import Alert from "../ui/alert";

type Props = {
  setPrevStep: () => void;
  services: Services | undefined;
};

const ServicesForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<ServicesFormValues>();

  const internetServiceSelected = watch("internet");
  const cableServicesSelected = watch("cable");

  const validateForm = () => {
    let isValid = true;
    if (!internetServiceSelected && !cableServicesSelected) {
      isValid = false;
      setError("cable", {
        message: "Seleccione el servicio a contratar",
        type: "required",
      });
    }

    return isValid;
  };

  const submitHandler = (values: any) => {
    const isValid = validateForm();
    if (!isValid) return;

    console.log(values);
  };

  const closeErrorMessage = () => {
    clearErrors();
  };

  let errorMessage;
  if (errors.cable) {
    errorMessage = (
      <Alert
        status="error"
        title={(errors.cable as any)?.message}
        onClose={closeErrorMessage}
      />
    );
  }

  return (
    <Box>
      <Text fontSize="lg" fontWeight="bold" mb="2">
        2) Seleccione sus servicios:
      </Text>
      {errorMessage}
      <form onSubmit={handleSubmit(submitHandler)}>
        <Stack spacing={4}>
          <InternetServices
            services={props.services?.internet}
            register={register}
            serviceSelected={internetServiceSelected}
          />
          <Divider />
          <CableServices
            services={props.services?.cable}
            register={register}
            selectedServices={cableServicesSelected}
          />
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
              Siguiente
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
};

export default ServicesForm;
