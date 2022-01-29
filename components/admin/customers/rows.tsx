import { IconButton, Td, Tr } from "@chakra-ui/react";
import { PencilIcon } from "@heroicons/react/solid";

import { ClientSchema } from "../../../types";
import { formateDateToFullDate } from "../../../utils/dateHelpers";

type Props = {
  customers: ClientSchema[];
  onOpenModal: (userDni: string) => void;
};

const CustomersTableRows = (props: Props) => {
  return (
    <>
      {props.customers.map((user) => (
        <Tr key={user.Dni}>
          <Td textAlign="center">{user.Dni}</Td>
          <Td textAlign="center">{`${user.Apellido} ${user.Nombre}`}</Td>
          <Td textAlign="center">
            {formateDateToFullDate(user.FechaNacimiento)}
          </Td>
          <Td textAlign="center">{user.Direccion}</Td>
          <Td textAlign="center">{user.Telefono}</Td>
          <Td textAlign="center">{user.CorreoElectronico}</Td>
          <Td textAlign="center">
            <IconButton
              colorScheme="purple"
              aria-label="Edit Service"
              variant="outline"
              icon={<PencilIcon />}
              w="10"
              h="10"
              p="2"
              onClick={() => props.onOpenModal(user.Dni)}
            />
          </Td>
        </Tr>
      ))}
    </>
  );
};

export default CustomersTableRows;
