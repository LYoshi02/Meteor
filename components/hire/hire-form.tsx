import { useEffect, useState } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import UserForm from "./user-form";
import { Services, UserFormValues } from "../../types";
import ServicesForm from "./services-form";

type FormValues = {
  user: UserFormValues;
  services: {
    name: string;
  };
};

type Props = {
  services: Services | undefined;
};

const HireForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
    reset,
    trigger,
  } = useForm<FormValues>();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    if (isSubmitSuccessful) {
      toast({
        title: "Servicio Contratado!",
        description: "Sus datos se han registrado correctamente",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      reset();
    }
  }, [isSubmitSuccessful, reset, toast]);

  const prevStepHandler = () => {
    setCurrentStep((prevValue) => prevValue - 1);
  };

  const nextStepHandler = async () => {
    const isFormValid = await trigger();
    if (isFormValid) {
      setCurrentStep((prevValue) => prevValue + 1);
    }
  };

  let currentForm;
  if (currentStep === 1) {
    currentForm = (
      <UserForm
        registerInput={register}
        errors={errors}
        setNextStep={nextStepHandler}
      />
    );
  } else if (currentStep === 2) {
    currentForm = (
      <ServicesForm setPrevStep={prevStepHandler} services={props.services} />
    );
  }

  const submitHandler = async (data: FormValues) => {
    console.log(data);
    // await fetch("/api/user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };

  return <form onSubmit={handleSubmit(submitHandler)}>{currentForm}</form>;
};

export default HireForm;
