import { SimpleGrid, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Input from "../ui/input";
import { UserFormValues } from "../../types";
import ActionButtons from "../ui/action-buttons";

type Props = {
  onSetNextStep: () => void;
  onSetFormValues: (values: UserFormValues) => void;
  savedValues: UserFormValues | undefined;
};

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserForm = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserFormValues>({
    defaultValues: props.savedValues,
  });

  const submitHandler = (values: UserFormValues) => {
    props.onSetFormValues(values);
    props.onSetNextStep();
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
            validate: {
              isPositiveNumber: (dni) =>
                +dni > 0 || "El DNI ingresado no es válido",
            },
            maxLength: { value: 8, message: "El DNI ingresado no es válido" },
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
          id="phone"
          label="Teléfono"
          type="tel"
          hookForm={register("phone", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.phone?.message}
        />

        <Input
          id="email"
          label="Correo Electrónico"
          type="text"
          hookForm={register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: emailRegex,
              message: "Ingrese un correo electrónico válido",
            },
          })}
          errorMsg={errors.email?.message}
        />
      </Stack>
      <ActionButtons primaryBtn={{ text: "Siguiente", type: "submit" }} />
    </form>
  );
};

export default UserForm;
