import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useSWR from "swr";
import { useEffect } from "react";

import { ClientSchema, UserFormValues } from "../../../types";
import { emailRegex } from "../../../utils/constants";
import Input from "../../ui/input";
import useHttp from "../../../hooks/useHttp";
import LoadingSpinner from "../../ui/loading-spinner";
import useToastOnReq from "../../../hooks/useToastOnReq";

type Props = {
  onCloseModal: () => void;
  customerDni: string;
  onUpdateCustomer: (customer: ClientSchema) => void;
};

const EditCustomerForm = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<UserFormValues>();
  const {
    isLoading,
    sendRequest,
    error: reqError,
    success: reqSuccess,
  } = useHttp();
  const { data: customerData } = useSWR<{
    customer: ClientSchema;
  }>(props.customerDni ? `/api/admin/customers/${props.customerDni}` : null);

  useToastOnReq({
    success: {
      showToast: reqSuccess,
      message: "Cliente editado correctamente",
    },
    error: {
      showToast: reqError !== null,
      message: reqError?.message,
    },
  });

  useEffect(() => {
    if (customerData) {
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
    await sendRequest<{ message: string; customer: ClientSchema }>(
      {
        input: `/api/admin/customers/${props.customerDni}`,
        init: {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customer: values }),
        },
      },
      (data) => props.onUpdateCustomer(data.customer)
    );

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
                +dni > 0 || "El Dni ingresado no es v??lido",
              withoutDots: (dni) =>
                !dni.includes(".") || "El Dni no debe contener puntos",
            },
            maxLength: { value: 8, message: "El Dni ingresado no es v??lido" },
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
          label="Direcci??n"
          type="text"
          hookForm={register("address", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.address?.message}
        />

        <Input
          id="phone"
          label="Tel??fono"
          type="tel"
          hookForm={register("phone", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.phone?.message}
        />

        <Input
          id="email"
          label="Correo Electr??nico"
          type="text"
          hookForm={register("email", {
            required: "Este campo es obligatorio",
            pattern: {
              value: emailRegex,
              message: "Ingrese un correo electr??nico v??lido",
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
