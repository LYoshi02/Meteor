import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import useSWR from "swr";
import { useState } from "react";

import Alert from "../ui/alert";
import LoadingSpinner from "../ui/loading-spinner";
import CustomersTable from "./customers/table";
import { ClientSchema } from "../../types";
import EditCustomerModal from "./customers/edit-modal";
import EditCustomerForm from "./customers/edit-form";

const Customers = () => {
  const { data, error, mutate } = useSWR<{
    customers: ClientSchema[];
    customersCount: number;
  }>("/api/admin/customers");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [customerDni, setCustomerDni] = useState("");

  const updateCustomerHandler = (updatedCustomer: ClientSchema) => {
    mutate((currentData) => {
      const updatedCustomers = [...currentData!.customers];
      const updatedCustomerIndex = updatedCustomers.findIndex(
        (c) => c.Dni === updatedCustomer.Dni
      );

      updatedCustomers[updatedCustomerIndex] = updatedCustomer;

      return {
        customers: updatedCustomers,
        customersCount: currentData!.customersCount,
      };
    });
  };

  const openModalHandler = (dni: string) => {
    setCustomerDni(dni);
    onOpen();
  };

  const closeModalHandler = () => {
    setCustomerDni("");
    onClose();
  };

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <CustomersTable
        customers={data.customers}
        customersCount={data.customersCount}
        openEditModal={openModalHandler}
      />
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
      <EditCustomerModal
        isOpen={isOpen}
        onClose={closeModalHandler}
        customerDni={customerDni}
        body={
          <EditCustomerForm
            onCloseModal={closeModalHandler}
            customerDni={customerDni}
            onUpdateCustomer={updateCustomerHandler}
          />
        }
      />
      <Heading as="h2">Clientes</Heading>
      <Box mt="4">{mainContent}</Box>
    </Box>
  );
};

export default Customers;
