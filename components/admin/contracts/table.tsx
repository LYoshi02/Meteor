import { Box, Table, Tbody, Td, Th, Thead, Tr, Switch } from "@chakra-ui/react";
import { useState } from "react";

import usePagination from "../../../hooks/usePagination";
import { ContractSchema } from "../../../types/index";
import { formateDateToFullDate } from "../../../utils/dateHelpers";
import AlertDialog from "../../ui/alert-dialog";
import PaginationFooter from "../../ui/pagination-foooter";

type Props = {
  contracts: ContractSchema[];
  contractsCount: number;
  onChangeStatus: (contractNumber: number) => void;
};

const ContractsTable = (props: Props) => {
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.contractsCount,
    });
  const [savedContractNumber, setSavedContractNumber] = useState<number>();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const shownContracts = props.contracts.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  const inputChangedHandler = (contractNumber: number) => {
    saveContractNumber(contractNumber);
    openAlertDialog();
  };

  const saveContractNumber = (contractNumber: number | undefined) => {
    setSavedContractNumber(contractNumber);
  };

  const openAlertDialog = () => {
    setIsAlertOpen(true);
  };

  const closeAlertDialog = () => {
    setIsAlertOpen(false);
  };

  const changeContractStatus = () => {
    if (savedContractNumber) {
      props.onChangeStatus(savedContractNumber);
    }
    closeAlertDialog();
    saveContractNumber(undefined);
  };

  return (
    <>
      <AlertDialog
        title={`Finalizar Contrato ${savedContractNumber}`}
        description="¿Desea finalizar el contrato? No podrá revertir el cambio realizado"
        isOpen={isAlertOpen}
        onClose={closeAlertDialog}
        actions={{
          primaryBtn: {
            text: "Aceptar",
            action: changeContractStatus,
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
              <Th textAlign="center">Contrato</Th>
              <Th textAlign="center">Fecha de Inicio</Th>
              <Th textAlign="center">Dni</Th>
              <Th textAlign="center">Finalizado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shownContracts.map((contract) => (
              <Tr key={contract.NroContrato}>
                <Td textAlign="center">{contract.NroContrato}</Td>
                <Td textAlign="center" textTransform="capitalize">
                  {formateDateToFullDate(contract.FechaInicio)}
                </Td>
                <Td textAlign="center">{contract.DniCliente}</Td>
                <Td textAlign="center">
                  <Switch
                    isDisabled={contract.FechaFin !== null}
                    isChecked={contract.FechaFin !== null}
                    onChange={() => inputChangedHandler(contract.NroContrato)}
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

export default ContractsTable;
