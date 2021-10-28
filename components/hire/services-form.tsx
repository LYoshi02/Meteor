import { useForm } from "react-hook-form";
import { Box, Button, Divider, Stack, Text } from "@chakra-ui/react";

import InternetServices from "./services/internet-services";
import { ServicesFormValues, Services } from "../../types";
import CableServices from "./services/cable-services";
import Alert from "../ui/alert";

type Props = {
  onSetPrevStep: () => void;
  onSetNextStep: () => void;
  onSetFormValues: (values: ServicesFormValues) => void;
  services: Services | undefined;
  savedValues: ServicesFormValues | undefined;
};

const ServicesForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<ServicesFormValues>({ defaultValues: props.savedValues });

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

  const submitHandler = (values: ServicesFormValues) => {
    const isValid = validateForm();
    if (!isValid) return;

    props.onSetFormValues(values);
    props.onSetNextStep();
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
            selectedService={internetServiceSelected}
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
              onClick={props.onSetPrevStep}
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
