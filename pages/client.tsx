import { NextPage } from "next";
import { Box, Heading, SimpleGrid, Button, Center } from "@chakra-ui/react";
import { useForm } from "react-hook-form";

import Input from "../components/ui/input";

const Client: NextPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = (data: any) => {
    console.log(data);
  };

  return (
    <Center height="full">
      <Box>
        <Heading as="h2" size="lg">
          Contratar Servicio
        </Heading>
        <Box mt="2">
          <form onSubmit={handleSubmit(submitHandler)}>
            <SimpleGrid columns={{ md: 2 }} spacing="10">
              <Input
                id="name"
                label="Nombre"
                type="text"
                hookForm={register("name")}
              />
              <Input id="surname" label="Apellido" type="text" />
            </SimpleGrid>

            <Input id="dni" label="DNI" type="text" />

            <Input id="birth-date" label="Fecha de Nacimiento" type="date" />

            <Input id="address" label="Dirección" type="text" />

            <Input id="email" label="Correo Electrónico" type="email" />

            <Button
              type="submit"
              colorScheme="teal"
              width={{ sm: "full", md: "auto" }}
              mt="2"
            >
              Enviar
            </Button>
          </form>
        </Box>
      </Box>
    </Center>
  );
};

export default Client;
