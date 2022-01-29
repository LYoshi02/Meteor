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

  const addServiceHandler = (newService: ServiceSchema & { Tipo: string }) => {
    mutate((currentData) => {
      return {
        services: [...currentData!.services, newService],
        servicesCount: currentData!.servicesCount,
      };
    });
  };

  const updateServiceHandler = (updatedService: ServiceSchema) => {
    mutate((currentData) => {
      const updatedServices = [...currentData!.services];
      const updatedServiceIndex = updatedServices.findIndex(
        (s) => s.NroServicio === updatedService.NroServicio
      );

      updatedServices[updatedServiceIndex] = {
        ...updatedService,
        Tipo: updatedServices[updatedServiceIndex].Tipo,
      };

      return {
        services: updatedServices,
        servicesCount: currentData!.servicesCount,
      };
    });
  };

  const deleteServiceHandler = (serviceNumber: number) => {
    mutate((currentData) => {
      const updatedServices = currentData!.services.filter(
        (s) => s.NroServicio !== serviceNumber
      );

      return {
        services: updatedServices,
        servicesCount: currentData!.servicesCount,
      };
    });
  };

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <>
        <Button mb="2" onClick={onOpen} colorScheme="purple">
          Crear Servicio
        </Button>
        <ServicesTable
          services={data.services}
          servicesCount={data.servicesCount}
          onDeleteService={deleteServiceHandler}
          onEditService={updateServiceHandler}
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
        body={
          <CreateServiceForm
            onCloseModal={onClose}
            onAddService={addServiceHandler}
          />
        }
      />
      <Heading as="h2">Servicios</Heading>
      <Box mt="4">{mainContent}</Box>
    </Box>
  );
};

export default Services;
