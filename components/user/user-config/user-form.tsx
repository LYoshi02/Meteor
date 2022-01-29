import { useEffect } from "react";
import useSWR from "swr";
import { Button, Divider, SimpleGrid, Stack, useToast } from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";

import Input from "../../ui/input";
import { emailRegex } from "../../../utils/constants";
import PasswordInput from "../../ui/password-input";
import { UserConfigFormValues, UserConfigData } from "../../../types";
import LoadingSpinner from "../../ui/loading-spinner";
import Alert from "../../ui/alert";
import useHttp from "../../../hooks/useHttp";
import useToastOnReq from "../../../hooks/useToastOnReq";

const UserForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
  } = useForm<UserConfigFormValues>();
  const { data: userData, error: userError } =
    useSWR<UserConfigData>("/api/user");
  const {
    isLoading,
    error: reqError,
    sendRequest,
    success: reqSuccess,
  } = useHttp();
  const toast = useToast();

  useEffect(() => {
    if (userData) {
      setValue("firstName", userData.firstName);
      setValue("lastName", userData.lastName);
      setValue("address", userData.address);
      setValue("phone", userData.phone);
      setValue("email", userData.email);
    }
  }, [userData, setValue]);

  useToastOnReq({
    success: {
      showToast: reqSuccess,
      message: "Tus datos se actualizaron correctamente",
    },
    error: {
      showToast: reqError !== null,
      message: reqError?.message,
    },
  });

  const validatePasswords = (currentPassword: string, newPassword: string) => {
    if (currentPassword.length === 0 && newPassword.length > 0) {
      setError("currentPassword", { message: "Ingrese la contraseña actual" });
      return false;
    }
    if (currentPassword.length > 0 && newPassword.length === 0) {
      setError("newPassword", { message: "Ingresa la nueva contraseña" });
      return false;
    }

    return true;
  };

  const submitHandler: SubmitHandler<UserConfigFormValues> = async (values) => {
    if (!validatePasswords(values.currentPassword, values.newPassword)) return;

    await sendRequest({
      input: "/api/user",
      init: {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: values }),
      },
    });
  };

  if (!userData && !userError) {
    return <LoadingSpinner />;
  } else if (userError) {
    return (
      <Alert
        title="Error!"
        description="Se produjo un error, intente más tarde."
        status="error"
      />
    );
  }

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
            validate: (value) => {
              if (value.length === 0 || value.length >= 8) return true;

              return "La contraseña debe tener al menos 8 caracteres";
            },
          })}
          errorMsg={errors.currentPassword?.message}
        />

        <PasswordInput
          id="newPassword"
          label="Nueva Contraseña"
          hookForm={register("newPassword", {
            validate: (value) => {
              if (!value || value.length === 0) return true;

              if (value && value.length < 8)
                return "La contraseña debe tener al menos 8 caracteres";

              if (value && value.length >= 8) return true;
            },
          })}
          errorMsg={errors.newPassword?.message}
        />

        <Button
          type="submit"
          colorScheme="purple"
          width={{ base: "full", sm: "36" }}
          alignSelf="flex-end"
          isLoading={isLoading}
        >
          Guardar
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
