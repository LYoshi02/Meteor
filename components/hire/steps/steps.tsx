import {
  Promotions,
  Services,
  ServicesFormValues,
  UserFormValues,
} from "../../../types";
import UserForm from "./user-form";
import ServicesForm from "./services-form";
import HireSummary from "./hire-summary";
import { useState } from "react";
import StepsHeader from "./steps-header";

type Props = {
  services: Services | undefined;
  promotions: Promotions[] | undefined;
  isReqLoading: boolean;
  onHireService: (user: UserFormValues, services: number[]) => void;
};

const HireSteps = (props: Props) => {
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

  const finishHiringProcess = () => {
    let selectedServices: number[] = [];

    if (servicesFormValues) {
      selectedServices = [
        servicesFormValues.internet,
        servicesFormValues.cable.required,
        ...servicesFormValues.cable.optional,
      ]
        .filter((s) => s)
        .map((s) => +s);
    }

    if (!userFormValues) {
      setCurrentStep(1);
      return;
    }

    props.onHireService(userFormValues, selectedServices);
  };

  let currentForm = null;
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
        promotions={props.promotions}
      />
    );
  } else if (currentStep === 3) {
    currentForm = (
      <HireSummary
        services={props.services}
        promotions={props.promotions}
        selectedServices={servicesFormValues}
        isReqLoading={props.isReqLoading}
        onSetPrevStep={prevStepHandler}
        onFinish={finishHiringProcess}
      />
    );
  }

  return (
    <>
      <StepsHeader currentStep={currentStep} />
      {currentForm}
    </>
  );
};

export default HireSteps;
