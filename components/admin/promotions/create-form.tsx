import {
  Button,
  Divider,
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
import useSWR from "swr";

import { PromotionFormValues } from "../../../types";
import Input from "../../ui/input";
import useHttp from "../../../hooks/useHttp";
import { ServiceSchema } from "../../../types";

type Props = {
  onCloseModal: () => void;
};

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
  } = useForm<PromotionFormValues>({
    defaultValues: { services: [], discount: 0 },
  });
  const { sendRequest } = useHttp();
  const { data } = useSWR<{
    services: (ServiceSchema & { Tipo: string })[];
    servicesCount: number;
  }>("/api/admin/services");

  const selectedServices = watch("services");
  const appliedDiscount = watch("discount");

  const submitHandler = async (values: PromotionFormValues) => {
    if (selectedServices.length === 0) {
      setError("services.0", {
        message: "Seleccione los servicios en promoción",
        type: "required",
      });
      return;
    }

    await sendRequest({
      input: "/api/admin/promotions",
      init: {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promotion: values }),
      },
    });
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

  const selectedServicesDetails = selectedServices.map((id) => {
    return data?.services.find((service) => service.NroServicio === id);
  });

  let totalServicesValue = 0;
  if (selectedServicesDetails.length > 0) {
    totalServicesValue = selectedServicesDetails.reduce(
      (prevTotal, currService) => prevTotal + parseFloat(currService!.Precio),
      0
    );
  }
  const servicesDiscount = totalServicesValue * (appliedDiscount / 100) || 0;
  const totalServicesValueWithDiscount = totalServicesValue - servicesDiscount;

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
            {data?.services.map((service, index) => (
              <option
                key={service.NroServicio}
                value={service.NroServicio}
                disabled={selectedServices.includes(service.NroServicio)}
              >
                {`${service.Nombre} ($${service.Precio})`}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.services && errors.services[0].message}
          </FormErrorMessage>
          <HStack spacing={2} mt="2">
            {selectedServices.map((id) => {
              const serviceDetails = data?.services.find(
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

        <Divider />

        <Text>
          <Text as="span" fontWeight="bold">
            Total:
          </Text>{" "}
          ${totalServicesValue}
        </Text>

        <Text>
          <Text as="span" fontWeight="bold">
            Total c/ Descuento:
          </Text>{" "}
          ${totalServicesValueWithDiscount}
        </Text>

        <Button type="submit" colorScheme="teal">
          Crear
        </Button>
      </Stack>
    </form>
  );
};

export default CreatePromotionForm;
