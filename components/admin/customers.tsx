import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import useSWR from "swr";
import { useState } from "react";

import Alert from "../ui/alert";
import LoadingSpinner from "../ui/loading-spinner";
import CustomersTable from "./customers/table";
import { ClientSchema } from "../../types";
import EditCustomerModal from "./customers/edit-modal";

const Customers = () => {
  const { data, error, mutate } = useSWR<{
    customers: ClientSchema[];
    customersCount: number;
  }>("/api/admin/customers");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [customerDni, setCustomerDni] = useState("");

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
    <Box maxW="full">
      <EditCustomerModal
        isOpen={isOpen}
        onClose={closeModalHandler}
        customerDni={customerDni}
      />
      <Heading as="h2">Clientes</Heading>
      <Box mt="4">{mainContent}</Box>
    </Box>
  );
};

export default Customers;
