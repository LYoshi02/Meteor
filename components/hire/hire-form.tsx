import { useState } from "react";
import { Box } from "@chakra-ui/react";

import UserForm from "./user-form";
import {
  Deal,
  Services,
  ServicesFormValues,
  UserFormValues,
} from "../../types";
import ServicesForm from "./services-form";
import HireSummary from "./hire-summary";
import StepsHeader from "./steps-header";

type Props = {
  services: Services | undefined;
  deals: Deal[] | undefined;
};

const HireForm = (props: Props) => {
  const [userFormValues, setUserFormValues] = useState<UserFormValues>();
  const [servicesFormValues, setServicesFormValues] =
    useState<ServicesFormValues>();
  const [currentStep, setCurrentStep] = useState(1);

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

    try {
      const result = await fetch("/api/hire", {
        method: "POST",
        body: JSON.stringify(hiringData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(await result.json());
    } catch (error) {
      console.log(error);
    }
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
        deals={props.deals}
        selectedServices={servicesFormValues}
        onSetPrevStep={prevStepHandler}
        onHireService={hireServiceHandler}
      />
    );
  }

  return (
    <Box>
      <StepsHeader currentStep={currentStep} />
      {currentForm}
    </Box>
  );
};

export default HireForm;
