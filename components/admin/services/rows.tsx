import { HStack, IconButton, Td, Tr } from "@chakra-ui/react";
import { PencilIcon, TrashIcon } from "@heroicons/react/solid";

import { ServiceSchema } from "../../../types";

type Props = {
  services: (ServiceSchema & { Tipo: string })[];
  onOpenAlert: (promotionNumber: number) => void;
  onOpenModal: (promotionNumber: number) => void;
};

const ServicesTableRows = (props: Props) => {
  console.log(props.services);
  return (
    <>
      {props.services.map((service) => (
        <Tr key={service.NroServicio}>
          <Td textAlign="center">{service.NroServicio}</Td>
          <Td textAlign="center">{service.Nombre}</Td>
          <Td textAlign="center">{service.Tipo}</Td>
          <Td textAlign="center">{service.Precio}</Td>
          <Td textAlign="center">{service.Oculto ? "Si" : "No"}</Td>
          <Td textAlign="center">
            <HStack spacing={2} justifyContent="center">
              <IconButton
                colorScheme="red"
                aria-label="Delete Service"
                variant="outline"
                icon={<TrashIcon />}
                w="10"
                h="10"
                p="2"
                onClick={() => props.onOpenAlert(service.NroServicio)}
              />

              <IconButton
                colorScheme="purple"
                aria-label="Edit Service"
                variant="outline"
                icon={<PencilIcon />}
                w="10"
                h="10"
                p="2"
                onClick={() => props.onOpenModal(service.NroServicio)}
              />
            </HStack>
          </Td>
        </Tr>
      ))}
    </>
  );
};

export default ServicesTableRows;
