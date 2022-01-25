import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import useSWR from "swr";

import Alert from "../ui/alert";
import LoadingSpinner from "../ui/loading-spinner";
import ServicesTable from "./services/table";
import { ServiceSchema } from "../../types";
import ServiceModal from "./services/create-modal";
import CreateServiceForm from "./services/create-form";

const Services = () => {
  const { data, error, mutate } = useSWR<{
    services: (ServiceSchema & { Tipo: string })[];
    servicesCount: number;
  }>("/api/admin/services");
  const { isOpen, onClose, onOpen } = useDisclosure();

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <>
        <Button mb="2" onClick={onOpen} colorScheme="teal">
          Crear Servicio
        </Button>
        <ServicesTable
          services={data.services}
          servicesCount={data.servicesCount}
        />
      </>
    );
  } else if (error) {
    mainContent = (
      <Alert
        title="Error!"
        description="Se produjo un error, intente más tarde."
        status="error"
      />
    );
  } else {
    mainContent = <LoadingSpinner />;
  }

  return (
    <Box>
      <ServiceModal
        isOpen={isOpen}
        onClose={onClose}
        isEditing={false}
        body={<CreateServiceForm onCloseModal={onClose} />}
      />
      <Heading as="h2">Servicios</Heading>
      <Box mt="4">{mainContent}</Box>
    </Box>
  );
};

export default Services;