import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box, useToast } from "@chakra-ui/react";

import UserForm from "./user-form";
import {
  Promotion,
  Services,
  ServicesFormValues,
  UserFormValues,
} from "../../types";
import ServicesForm from "./services-form";
import HireSummary from "./hire-summary";
import StepsHeader from "./steps-header";
import useHttp from "../../hooks/useHttp";
import HireModal from "./hire-modal";

type Props = {
  services: Services | undefined;
  promotions: Promotion[] | undefined;
};

const HireForm = (props: Props) => {
  const [userFormValues, setUserFormValues] = useState<UserFormValues>();
  const [servicesFormValues, setServicesFormValues] =
    useState<ServicesFormValues>();
  const [currentStep, setCurrentStep] = useState(1);
  const { error, isLoading, success, sendRequest } = useHttp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (success) {
      setIsModalOpen(true);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      if (error.status === 422) {
        setCurrentStep(1);
      }

      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        duration: 9000,
        isClosable: true,
        variant: "solid",
      });
    }
  }, [error, toast]);

  const closeModalHandler = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  const setUserFormValuesHandler = (values: UserFormValues) => {
    setUserFormValues(values);
  };

  const setServicesFormValuesHandler = (values: ServicesFormValues) => {
    setServicesFormValues(values);
  };

  const prevStepHandler = () => {
    setCurrentStep((prevValue) => prevValue - 1);
  };

  const nextStepHandler = async () => {
    setCurrentStep((prevValue) => prevValue + 1);
  };

  const hireServiceHandler = async () => {
    let selectedServices: number[] = [];

    if (servicesFormValues?.cable.required) {
      const selectedOptionalServices = servicesFormValues.cable.optional.filter(
        (s) => s && s
      );
      const optionalServicesNums = selectedOptionalServices.map((s) => +s);
      selectedServices.push(+servicesFormValues.cable.required);
      selectedServices.push(...optionalServicesNums);
    }

    if (servicesFormValues?.internet) {
      selectedServices.push(+servicesFormValues?.internet);
    }

    const hiringData = {
      user: userFormValues,
      services: selectedServices,
    };

    await sendRequest<{ hello: string }>({
      input: "/api/hire",
      init: {
        method: "POST",
        body: JSON.stringify(hiringData),
        headers: {
          "Content-Type": "application/json",
        },
      },
    });
  };

  let currentForm;
  if (currentStep === 1) {
    currentForm = (
      <UserForm
        onSetNextStep={nextStepHandler}
        onSetFormValues={setUserFormValuesHandler}
        savedValues={userFormValues}
      />
    );
  } else if (currentStep === 2) {
    currentForm = (
      <ServicesForm
        onSetPrevStep={prevStepHandler}
        onSetNextStep={nextStepHandler}
        services={props.services}
        onSetFormValues={setServicesFormValuesHandler}
        savedValues={servicesFormValues}
      />
    );
  } else if (currentStep === 3) {
    currentForm = (
      <HireSummary
        services={props.services}
        promotions={props.promotions}
        selectedServices={servicesFormValues}
        isReqLoading={isLoading}
        onSetPrevStep={prevStepHandler}
        onHireService={hireServiceHandler}
      />
    );
  }

  return (
    <Box>
      <StepsHeader currentStep={currentStep} />
      {currentForm}
      <HireModal
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        email={userFormValues?.email}
      />
    </Box>
  );
};

export default HireForm;
