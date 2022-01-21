import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Select,
  Stack,
  Text,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import useHttp from "../../../hooks/useHttp";

import { PromotionFormValues } from "../../../types";
import Input from "../../ui/input";

type Props = {
  onCloseModal: () => void;
};

const services = [
  { NroServicio: 1, Nombre: "Internet 1" },
  { NroServicio: 2, Nombre: "Internet 2" },
  { NroServicio: 3, Nombre: "Internet 3" },
  { NroServicio: 4, Nombre: "Internet 4" },
  { NroServicio: 5, Nombre: "Internet 5" },
];

const CreatePromotionForm = (props: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    watch,
    setValue,
    setError,
    clearErrors,
  } = useForm<PromotionFormValues>({ defaultValues: { services: [] } });

  const selectedServices = watch("services");
  console.log(errors);

  const submitHandler = async (values: PromotionFormValues) => {
    if (selectedServices.length === 0) {
      setError("services.0", {
        message: "Seleccione los servicios en promoción",
        type: "required",
      });
      return;
    }
    // await sendRequest({
    //   input: "/api/admin/services",
    //   init: {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ service: values }),
    //   },
    // });
    console.log(values);
    props.onCloseModal();
  };

  const setSelectedService = (serviceNumber: string) => {
    const serviceExists = selectedServices.includes(+serviceNumber);
    if (!serviceExists) {
      clearErrors("services.0");
      setValue("services", [...selectedServices, +serviceNumber]);
    }
  };

  const removeSelectedService = (serviceNumber: number) => {
    const updatedServices = selectedServices.filter(
      (num) => num !== serviceNumber
    );
    setValue("services", updatedServices);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <Stack spacing={4} mb="2">
        <Input
          id="duration"
          type="number"
          label="Duracion (en meses)"
          errorMsg={errors.duration?.message}
          hookForm={register("duration", {
            required: "Este campo es obligatorio",
            valueAsNumber: true,
            validate: (value) => {
              return (
                (value > 0 && value <= 12) ||
                "La duración debe ser de entre 1 y 12 meses"
              );
            },
          })}
        />

        <Input
          id="discount"
          type="number"
          label="Descuento (%)"
          errorMsg={errors.discount?.message}
          hookForm={register("discount", {
            required: "Este campo es obligatorio",
            valueAsNumber: true,
            validate: (value) => {
              return (
                (value > 0 && value < 100) ||
                "El descuento ingresado no es valido"
              );
            },
          })}
        />

        <FormControl isInvalid={errors.services && errors.services.length > 0}>
          <FormLabel>Servicios en Promoción</FormLabel>
          <Select
            placeholder="Seleccionar Servicio"
            onChange={(e) => setSelectedService(e.target.value)}
            value=""
          >
            {services.map((service, index) => (
              <option
                key={service.NroServicio}
                value={service.NroServicio}
                disabled={selectedServices.includes(service.NroServicio)}
              >
                {service.Nombre}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.services && errors.services[0].message}
          </FormErrorMessage>
          <HStack spacing={2} mt="2">
            {selectedServices.map((id) => {
              const serviceDetails = services.find(
                (service) => service.NroServicio === id
              );
              return (
                <Flex
                  key={id}
                  bgColor="gray.800"
                  px="2"
                  py="0.5"
                  borderRadius="5"
                  cursor="pointer"
                  onClick={() => removeSelectedService(id)}
                >
                  <Text>{serviceDetails?.Nombre}</Text>
                </Flex>
              );
            })}
          </HStack>
        </FormControl>

        <Button type="submit" colorScheme="teal">
          Crear
        </Button>
      </Stack>
    </form>
  );
};

export default CreatePromotionForm;
