import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import PaginationFooter from "../../ui/pagination-foooter";
import usePagination from "../../../hooks/usePagination";
import { ServiceSchema } from "../../../types/index";
import DeleteButton from "./delete-button";

type Props = {
  services: (ServiceSchema & { Tipo: string })[];
  servicesCount: number;
};

const ServicesTable = (props: Props) => {
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.servicesCount,
    });

  const shownServices = props.services.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  const deleteService = (serviceNumber: number) => {
    // TODO: finish this
    console.log(serviceNumber);
  };

  return (
    <>
      <Box height="full" maxWidth="full" overflow="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th textAlign="center">Nro. de Servicio</Th>
              <Th textAlign="center">Nombre</Th>
              <Th textAlign="center">Tipo</Th>
              <Th textAlign="center">Precio</Th>
              <Th textAlign="center">Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shownServices.map((service) => (
              <Tr key={service.NroServicio}>
                <Td textAlign="center">{service.NroServicio}</Td>
                <Td textAlign="center">{service.Nombre}</Td>
                <Td textAlign="center">{service.Tipo}</Td>
                <Td textAlign="center">{service.Precio}</Td>
                <Td textAlign="center">
                  <DeleteButton
                    onClick={() => deleteService(service.NroServicio)}
                  />
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

export default ServicesTable;
