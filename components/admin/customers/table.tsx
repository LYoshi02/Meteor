import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import PaginationFooter from "../../ui/pagination-foooter";
import usePagination from "../../../hooks/usePagination";
import { ClientSchema } from "../../../types/index";
import { formateDateToFullDate } from "../../../utils/dateHelpers";
import EditButton from "./edit-button";

type Props = {
  customers: ClientSchema[];
  customersCount: number;
  openEditModal: (dni: string) => void;
};

const CustomersTable = (props: Props) => {
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.customersCount,
    });

  const shownCustomers = props.customers.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  return (
    <>
      <Box height="full" maxWidth="full" overflow="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th textAlign="center">Dni</Th>
              <Th textAlign="center">Nombre Completo</Th>
              <Th textAlign="center">Fecha de Nac.</Th>
              <Th textAlign="center">Dirección</Th>
              <Th textAlign="center">Teléfono</Th>
              <Th textAlign="center">Correo</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shownCustomers.map((user) => (
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
                  <EditButton onClick={() => props.openEditModal(user.Dni)} />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <PaginationFooter
        pagination={{
          canNextPage: pagination.canNextPage,
          canPrevPage: pagination.canPrevPage,
          currentPage: pagination.currentPage,
          pageCount: pagination.pageCount,
        }}
        onSetPrevPage={setPrevPage}
        onSetNextPage={setNextPage}
        onChangePageSize={changePageSize}
      />
    </>
  );
};

export default CustomersTable;
