import { useEffect } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useHttp from "../../../hooks/useHttp";
import useSWR from "swr";

import { ServiceFormValues, ServiceSchema } from "../../../types";
import Input from "../../ui/input";

type Props = {
  onCloseModal: () => void;
  serviceNumber: number | undefined;
};

const EditServiceForm = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<{ name: string; price: string }>();
  const { isLoading, sendRequest } = useHttp();
  const { data: serviceData } = useSWR<{ service: ServiceSchema }>(
    props.serviceNumber ? `/api/admin/services/${props.serviceNumber}` : null
  );

  useEffect(() => {
    if (serviceData) {
      const { service } = serviceData;
      setValue("name", service.Nombre);
      setValue("price", service.Precio);
    }
  }, [serviceData, setValue]);

  const submitHandler = async (values: ServiceFormValues) => {
    await sendRequest({
      input: `/api/admin/services/${props.serviceNumber}`,
      init: {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: values }),
      },
    });
    props.onCloseModal();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={4} mb="2">
        <Input
          id="name"
          type="text"
          label="Nombre"
          errorMsg={errors.name?.message}
          hookForm={register("name", {
            required: "Este campo es obligatorio",
          })}
        />
        <Input
          id="price"
          type="text"
          label="Precio"
          errorMsg={errors.price?.message}
          hookForm={register("price", {
            required: "Este campo es obligatorio",
            validate: {
              isPositiveNumber: (price) =>
                +price > 0 || "El precio ingresado no es válido",
            },
          })}
        />

        <Button type="submit" colorScheme="purple" isLoading={isLoading}>
          Editar
        </Button>
      </Stack>
    </form>
  );
};

export default EditServiceForm;
