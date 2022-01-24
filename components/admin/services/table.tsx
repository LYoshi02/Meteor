import { useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useDisclosure,
} from "@chakra-ui/react";

import AlertDialog from "../../ui/alert-dialog";
import DeleteButton from "./delete-button";
import PaginationFooter from "../../ui/pagination-foooter";
import usePagination from "../../../hooks/usePagination";
import { ServiceSchema } from "../../../types/index";
import useHttp from "../../../hooks/useHttp";

type Props = {
  services: (ServiceSchema & { Tipo: string })[];
  servicesCount: number;
};

const ServicesTable = (props: Props) => {
  const [savedServiceNumber, setSavedServiceNumber] = useState<number>();
  const {
    isOpen: isAlertOpen,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();
  const { sendRequest } = useHttp();
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.servicesCount,
    });

  const shownServices = props.services.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  const openAlertDialog = (serviceNumber: number) => {
    setSavedServiceNumber(serviceNumber);
    onOpenAlert();
  };

  const closeAlertDialog = () => {
    setSavedServiceNumber(undefined);
    onCloseAlert();
  };

  const deleteService = async () => {
    await sendRequest({
      input: `/api/admin/services/${savedServiceNumber}`,
      init: {
        method: "DELETE",
      },
    });
    closeAlertDialog();
  };

  return (
    <>
      <AlertDialog
        title={`Borrar Servicio ${savedServiceNumber}`}
        description="Solo se pueden borrar servicios que no han sido contratados."
        isOpen={isAlertOpen}
        onClose={closeAlertDialog}
        actions={{
          primaryBtn: {
            text: "Aceptar",
            action: deleteService,
          },
          secondaryBtn: {
            text: "Cancelar",
            action: closeAlertDialog,
          },
        }}
      />
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
                    onClick={() => openAlertDialog(service.NroServicio)}
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
