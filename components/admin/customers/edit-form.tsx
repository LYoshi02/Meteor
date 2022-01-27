import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { useEffect } from "react";

import { ClientSchema, UserFormValues } from "../../../types";
import { emailRegex } from "../../../utils/constants";
import Input from "../../ui/input";
import useHttp from "../../../hooks/useHttp";
import LoadingSpinner from "../../ui/loading-spinner";

type Props = {
  onCloseModal: () => void;
  customerDni: string;
};

const EditCustomerForm = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<UserFormValues>();
  const { isLoading, sendRequest } = useHttp();
  const { data: customerData, error: customerReqError } = useSWR<{
    customer: ClientSchema;
  }>(props.customerDni ? `/api/admin/customers/${props.customerDni}` : null);

  useEffect(() => {
    if (customerData) {
      console.log(customerData);
      const {
        Apellido,
        CorreoElectronico,
        Direccion,
        Dni,
        FechaNacimiento,
        Nombre,
        Telefono,
      } = customerData.customer;
      setValue("lastName", Apellido);
      setValue("email", CorreoElectronico);
      setValue("address", Direccion);
      setValue("dni", Dni);
      setValue("birthDate", FechaNacimiento);
      setValue("firstName", Nombre);
      setValue("phone", Telefono);
    }
  }, [customerData, setValue]);

  const submitHandler = async (values: UserFormValues) => {
    await sendRequest({
      input: `/api/admin/customers/${props.customerDni}`,
      init: {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: values }),
      },
    });
    props.onCloseModal();
  };

  if (!customerData) {
    return <LoadingSpinner />;
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={4} mb="2">
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

        <Input
          id="dni"
          label="DNI"
          type="text"
          hookForm={register("dni", {
            required: "Este campo es obligatorio",
            validate: {
              isPositiveNumber: (dni) =>
                +dni > 0 || "El Dni ingresado no es válido",
              withoutDots: (dni) =>
                !dni.includes(".") || "El Dni no debe contener puntos",
            },
            maxLength: { value: 8, message: "El Dni ingresado no es válido" },
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

        <Button type="submit" colorScheme="purple" isLoading={isLoading}>
          Editar
        </Button>
      </Stack>
    </form>
  );
};

export default EditCustomerForm;
