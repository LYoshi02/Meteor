import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Button, Stack, useToast, ToastId } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Input from "../ui/input";
import useUser from "../../hooks/useUser";
import { AuthUser } from "../../types";
import useHttp from "../../hooks/useHttp";
import Alert from "../ui/alert";
import PasswordInput from "../ui/password-input";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { isLoading, error, sendRequest, dispatch } = useHttp();
  const { mutateUser } = useUser({});
  const router = useRouter();
  const toast = useToast();
  const toastRef = useRef<ToastId | undefined | null>(null);

  useEffect(() => {
    const showSuccessMessage = (url: string) => {
      if (url !== "/user/home") return;

      toastRef.current = toast({
        title: "Éxito!",
        description: "Iniciando sesión...",
        status: "success",
        isClosable: true,
        variant: "solid",
      });
    };

    const closeSuccessMessage = (url: string) => {
      if (url !== "/user/home") return;
      toast.close(toastRef.current!);
    };

    router.events.on("routeChangeStart", showSuccessMessage);
    router.events.on("routeChangeComplete", closeSuccessMessage);

    return () => {
      router.events.off("routeChangeStart", showSuccessMessage);
      router.events.off("routeChangeComplete", closeSuccessMessage);
    };
  }, [router, toast]);

  const submitHandler = async (values: FormValues) => {
    await sendRequest<AuthUser>(
      {
        input: "/api/auth/login",
        init: {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ user: values }),
        },
      },
      (userData) => {
        mutateUser(userData);
        router.push("/user/home");
      }
    );
  };

  const closeErrorAlert = () => {
    dispatch({ type: "reset" });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={4}>
        <Input
          id="email"
          label="Correo Electrónico"
          type="text"
          hookForm={register("email", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.email?.message}
        />
        <PasswordInput
          id="password"
          label="Contraseña"
          hookForm={register("password", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          })}
          errorMsg={errors.password?.message}
        />
        {error && (
          <Alert
            onClose={closeErrorAlert}
            title="Error!"
            description={error.message}
            status="error"
          />
        )}
        <Button type="submit" colorScheme="teal" isLoading={isLoading}>
          Iniciar Sesión
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
