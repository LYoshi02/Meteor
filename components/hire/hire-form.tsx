import { useState } from "react";
import { Box } from "@chakra-ui/react";

import UserForm from "./user-form";
import {
  HireFormValues,
  Services,
  ServicesFormValues,
  UserFormValues,
} from "../../types";
import ServicesForm from "./services-form";
import HireSummary from "./hire-summary";

type Props = {
  services: Services | undefined;
};

const HireForm = (props: Props) => {
  const [userFormValues, setUserFormValues] = useState<UserFormValues>();
  const [servicesFormValues, setServicesFormValues] =
    useState<ServicesFormValues>();
  const [currentStep, setCurrentStep] = useState(2);

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
        selectedServices={servicesFormValues}
        onSetPrevStep={prevStepHandler}
      />
    );
  }

  return <Box>{currentForm}</Box>;
};

export default HireForm;
