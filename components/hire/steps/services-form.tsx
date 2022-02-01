import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Box, Divider, Stack } from "@chakra-ui/react";
import { useRouter } from "next/router";

import ActionButtons from "../../ui/action-buttons";
import Alert from "../../ui/alert";
import CableServices from "./services/cable-services";
import InternetServices from "./services/internet-services";
import { ServicesFormValues, Services, Promotions } from "../../../types";
import { generateServicesArray, getServiceType } from "./services/form-helpers";

type Props = {
  onSetPrevStep: () => void;
  onSetNextStep: () => void;
  onSetFormValues: (values: ServicesFormValues) => void;
  services: Services | undefined;
  savedValues: ServicesFormValues | undefined;
  promotions: Promotions[] | undefined;
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
    setValue,
  } = useForm<ServicesFormValues>({
    defaultValues: props.savedValues || defaultFormValues,
  });
  const router = useRouter();

  useEffect(() => {
    const selectedPromotionNumber = router.query.promotion;
    if (selectedPromotionNumber && !props.savedValues) {
      const selectedPromotion = props.promotions?.find(
        (promo) => promo.NroPromocion === +selectedPromotionNumber
      );

      if (!selectedPromotion) return;

      const allServices = generateServicesArray(props.services);
      const optionalCableServices: string[] = [];

      selectedPromotion.Servicios.forEach((service) => {
        const type = getServiceType(service, allServices);

        if (type === "cable.optional") {
          optionalCableServices.push(service.toString());
        } else if (type === "internet" || type === "cable.required") {
          setValue(type, service.toString());
        }
      });

      setValue("cable.optional", optionalCableServices);
    }
  }, [
    props.promotions,
    props.services,
    props.savedValues,
    setValue,
    router.query,
  ]);

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
