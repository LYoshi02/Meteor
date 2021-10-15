import { Button, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import Input from "../ui/input";
import { HireFormValues } from "../../types";

type Props = {
  registerInput: UseFormRegister<HireFormValues>;
  errors: FieldErrors<HireFormValues>;
  setNextStep: () => void;
};

const UserForm = (props: Props) => {
  const {
    registerInput,
    errors: { user: userErrors },
  } = props;

  return (
    <Stack spacing={4}>
      <Text fontSize="lg" fontWeight="bold">
        1) Complete sus datos:
      </Text>
      <SimpleGrid columns={{ md: 2 }} spacingX="10" spacingY="4">
        <Input
          id="firstname"
          label="Nombre"
          type="text"
          hookForm={registerInput("user.firstName", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={userErrors?.firstName?.message}
        />
        <Input
          id="lastname"
          label="Apellido"
          type="text"
          hookForm={registerInput("user.lastName", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={userErrors?.lastName?.message}
        />
      </SimpleGrid>

      <Input
        id="dni"
        label="DNI"
        type="number"
        hookForm={registerInput("user.dni", {
          required: "Este campo es obligatorio",
          valueAsNumber: true,
          validate: {
            isPositiveNumber: (dni) =>
              dni > 0 || "El DNI ingresado no es válido",
          },
        })}
        errorMsg={userErrors?.dni?.message}
      />

      <Input
        id="birth-date"
        label="Fecha de Nacimiento"
        type="date"
        hookForm={registerInput("user.birthDate", {
          required: "Este campo es obligatorio",
        })}
        errorMsg={userErrors?.birthDate?.message}
      />

      <Input
        id="address"
        label="Dirección"
        type="text"
        hookForm={registerInput("user.address", {
          required: "Este campo es obligatorio",
        })}
        errorMsg={userErrors?.address?.message}
      />

      <Input
        id="email"
        label="Correo Electrónico"
        type="text"
        hookForm={registerInput("user.email", {
          required: "Este campo es obligatorio",
          pattern: {
            value:
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            message: "Ingrese un correo electrónico válido",
          },
        })}
        errorMsg={userErrors?.email?.message}
      />
      <Button
        type="button"
        colorScheme="teal"
        width={{ sm: "full", md: "auto" }}
        mt="4"
        onClick={props.setNextStep}
      >
        Siguiente
      </Button>
    </Stack>
  );
};

export default UserForm;
