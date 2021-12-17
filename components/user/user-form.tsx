import { Button, Divider, SimpleGrid, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Input from "../ui/input";
import { emailRegex } from "../../utils/constants";
import PasswordInput from "../ui/password-input";

type UserConfigFormValues = {
  firstName?: string;
  lastName?: string;
  address?: string;
  phone?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
};

const UserForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<UserConfigFormValues>({
    // defaultValues: props.savedValues,
  });

  const submitHandler = (values: any) => {
    console.log(values);
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
        <Divider />

        <PasswordInput
          id="currentPassword"
          label="Contraseña Actual"
          hookForm={register("currentPassword", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.currentPassword?.message}
        />

        <PasswordInput
          id="newPassword"
          label="Nueva Contraseña"
          hookForm={register("newPassword", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.currentPassword?.message}
        />

        <Button type="submit" colorScheme="teal">
          Guardar
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
