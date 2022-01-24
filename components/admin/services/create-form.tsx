import {
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useHttp from "../../../hooks/useHttp";

import { ServiceFormValues } from "../../../types";
import Input from "../../ui/input";

type Props = {
  onCloseModal: () => void;
  serviceNumberToEdit?: number;
};

const CreateServiceForm = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<ServiceFormValues>();
  const { isLoading, sendRequest } = useHttp();

  const selectedServiceType = watch("type");

  const submitHandler = async (values: ServiceFormValues) => {
    await sendRequest({
      input: "/api/admin/services",
      init: {
        method: "POST",
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
        <FormControl>
          <FormLabel>Tipo de Servicio</FormLabel>
          <RadioGroup>
            <Stack spacing={5} direction="row">
              <Radio
                colorScheme="teal"
                value="Internet"
                {...register("type", { required: true })}
              >
                Internet
              </Radio>
              <Radio
                colorScheme="teal"
                value="TV"
                {...register("type", { required: true })}
              >
                Cable
              </Radio>
            </Stack>
          </RadioGroup>
        </FormControl>
        <Divider />
        {selectedServiceType === "Internet" && (
          <Input
            id="speed"
            type="number"
            label="Velocidad"
            errorMsg={errors.speed?.message}
            hookForm={register("speed", {
              required: "Este campo es obligatorio",
              validate: {
                isPositiveNumber: (speed) =>
                  +speed > 0 || "La velocidad ingresada no es válida",
              },
            })}
          />
        )}
        {selectedServiceType === "TV" && (
          <Checkbox {...register("optional")}>Servicio Opcional</Checkbox>
        )}

        <Button type="submit" colorScheme="teal" isLoading={isLoading}>
          Crear
        </Button>
      </Stack>
    </form>
  );
};

export default CreateServiceForm;
