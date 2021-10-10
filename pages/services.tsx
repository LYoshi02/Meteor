import { useState } from "react";
import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";
import { Portal } from "@chakra-ui/react";

import AddServiceModal from "../components/services/add-modal";

export default function ServicesPage() {
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  const toggleModalHandler = () => {
    setIsAddModalVisible((prevState) => !prevState);
  };

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <Heading as="h2" size="md">
          Servicios
        </Heading>
        <Button variant="ghost" colorScheme="teal" onClick={toggleModalHandler}>
          Agregar Servicio
        </Button>
      </Flex>
      <Box bgColor="gray.700" mt="4">
        <Box p="2"></Box>
      </Box>
      <Portal>
        <AddServiceModal
          isOpen={isAddModalVisible}
          onClose={toggleModalHandler}
        />
      </Portal>
    </>
  );
}
