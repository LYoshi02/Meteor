import { Button, Checkbox, Divider, Select, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import Input from "../ui/input";

type FormValues = {
  nombre: string;
  precio: number;
  tipoServicio: "internet" | "cable";
  velocidad: number;
  cantidadTvs: number;
  servicioOpcional: boolean;
};

const isPositiveNumber = (num: number, errorMsg: string) => num > 0 || errorMsg;

const AddServiceForm = () => {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<FormValues>();
  const serviceType = watch("tipoServicio");

  let serviceOptions = null;
  if (serviceType === "internet") {
    serviceOptions = (
      <Input
        id="velocidad"
        label="Velocidad de Conexión"
        type="number"
        hookForm={register("velocidad", {
          required: "Este campo es obligatorio",
          valueAsNumber: true,
          validate: {
            isPositive: (value) =>
              isPositiveNumber(value, "El numero ingresado no es valido"),
          },
        })}
        errorMsg={errors.velocidad?.message}
      />
    );
  } else if (serviceType === "cable") {
    serviceOptions = (
      <>
        <Input
          id="cantidad-tvs"
          label="Cantidad de Televisores"
          type="number"
          hookForm={register("cantidadTvs", {
            required: "Este campo es obligatorio",
            valueAsNumber: true,
            validate: {
              isPositive: (value) =>
                isPositiveNumber(value, "El numero ingresado no es valido"),
            },
          })}
          errorMsg={errors.cantidadTvs?.message}
        />
        <Checkbox {...register("servicioOpcional")}>Servicio optativo</Checkbox>
      </>
    );
  }

  const addServiceHandler = async (data: FormValues) => {
    console.log(data);
    await fetch("/api/service", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(addServiceHandler)}>
      <Stack spacing="4">
        <Input
          id="nombre"
          label="Nombre"
          type="text"
          hookForm={register("nombre", {
            required: "Este campo es obligatorio",
          })}
          errorMsg={errors.nombre?.message}
        />
        <Input
          id="precio"
          label="Precio"
          type="number"
          hookForm={register("precio", {
            required: "Este campo es obligatorio",
            valueAsNumber: true,
          })}
          errorMsg={errors.precio?.message}
        />
        <Divider />
        <Select
          placeholder="Tipo de Servicio"
          errorBorderColor="red.500"
          isRequired={true}
          {...register("tipoServicio", {
            required: true,
          })}
        >
          <option value="cable">Cable</option>
          <option value="internet">Internet</option>
        </Select>
        {serviceOptions}
        <Button type="submit" colorScheme="blue" mt={4}>
          Guardar
        </Button>
      </Stack>
    </form>
  );
};

export default AddServiceForm;
