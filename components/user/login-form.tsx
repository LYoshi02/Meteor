import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Input from "../ui/input";

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

  const submitHandler = (values: FormValues) => {
    console.log(values);
  };

  console.log(errors);
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
        <Input
          id="password"
          label="Contraseña"
          type="password"
          hookForm={register("password", {
            required: "Este campo es obligatorio",
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
          })}
          errorMsg={errors.password?.message}
        />
        <Button type="submit" colorScheme="teal">
          Iniciar Sesión
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
