import { useForm } from "react-hook-form";
import { Box, Divider, Stack } from "@chakra-ui/react";

import ActionButtons from "../ui/action-buttons";
import Alert from "../ui/alert";
import CableServices from "./services/cable-services";
import InternetServices from "./services/internet-services";
import { ServicesFormValues, Services } from "../../types";

type Props = {
  onSetPrevStep: () => void;
  onSetNextStep: () => void;
  onSetFormValues: (values: ServicesFormValues) => void;
  services: Services | undefined;
  savedValues: ServicesFormValues | undefined;
};

const defaultFormValues: ServicesFormValues = {
  cable: {
    optional: [],
    required: "",
  },
  internet: "",
};

const ServicesForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<ServicesFormValues>({
    defaultValues: props.savedValues || defaultFormValues,
  });

  const internetServiceSelected = watch("internet");
  const cableServicesSelected = watch("cable");

  const validateForm = () => {
    let isValid = true;
    if (!internetServiceSelected && !cableServicesSelected.required) {
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
      <Box mb="2">
        <Alert
          status="error"
          title={(errors.cable as any)?.message}
          onClose={closeErrorMessage}
        />
      </Box>
    );
  }

  return (
    <Box>
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
          <ActionButtons
            primaryBtn={{ text: "Siguiente", btnConfig: { type: "submit" } }}
            secondaryBtn={{ text: "Anterior", action: props.onSetPrevStep }}
          />
        </Stack>
      </form>
    </Box>
  );
};

export default ServicesForm;
