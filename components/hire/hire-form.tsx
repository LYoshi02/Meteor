import { useState } from "react";
import { Box } from "@chakra-ui/react";

import UserForm from "./user-form";
import { HireFormValues, Services, UserFormValues } from "../../types";
import ServicesForm from "./services-form";

type Props = {
  services: Services | undefined;
};

const HireForm = (props: Props) => {
  const [userFormValues, setUserFormValues] = useState<UserFormValues>();
  const [currentStep, setCurrentStep] = useState(2);

  const setUserFormValuesHandler = (values: UserFormValues) => {
    setUserFormValues(values);
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
        setNextStep={nextStepHandler}
        onSetFormValues={setUserFormValuesHandler}
        savedValues={userFormValues}
      />
    );
  } else if (currentStep === 2) {
    currentForm = (
      <ServicesForm setPrevStep={prevStepHandler} services={props.services} />
    );
  }

  const submitHandler = async (data: HireFormValues) => {
    console.log(data);
  };

  return <Box>{currentForm}</Box>;
};

export default HireForm;
