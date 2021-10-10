import { useEffect } from "react";
import { SimpleGrid, Button, Stack, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Input from "../ui/input";

type FormValues = {
  firstName: string;
  lastName: string;
  dni: number;
  birthDate: Date;
  address: string;
  email: string;
};

const HireForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    reset,
  } = useForm<FormValues>();
  const toast = useToast();

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

  const submitHandler = async (data: FormValues) => {
    await fetch("/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={4}>
        <SimpleGrid columns={{ md: 2 }} spacingX="10" spacingY="4">
          <Input
            id="firstname"
            label="Nombre"
            type="text"
            hookForm={register("firstName", {
              required: "Este campo es obligatorio",
            })}
            errorMsg={errors.firstName?.message}
          />
          <Input
            id="lastname"
            label="Apellido"
            type="text"
            hookForm={register("lastName", {
              required: "Este campo es obligatorio",
            })}
            errorMsg={errors.lastName?.message}
          />
        </SimpleGrid>

        <Input
          id="dni"
          label="DNI"
          type="number"
          hookForm={register("dni", {
            required: "Este campo es obligatorio",
            valueAsNumber: true,
            validate: {
              isPositiveNumber: (dni) =>
                dni > 0 || "El DNI ingresado no es válido",
            },
          })}
          errorMsg={errors.dni?.message}
        />

        <Input
          id="birth-date"
          label="Fecha de Nacimiento"
          type="date"
          hookForm={register("birthDate", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.birthDate?.message}
        />

        <Input
          id="address"
          label="Dirección"
          type="text"
          hookForm={register("address", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.address?.message}
        />

        <Input
          id="email"
          label="Correo Electrónico"
          type="text"
          hookForm={register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Ingrese un correo electrónico válido",
            },
          })}
          errorMsg={errors.email?.message}
        />
      </Stack>

      <Button
        type="submit"
        colorScheme="teal"
        width={{ sm: "full", md: "auto" }}
        mt="4"
        isLoading={isSubmitting}
      >
        Enviar
      </Button>
    </form>
  );
};

export default HireForm;
