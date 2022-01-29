import { useState } from "react";

import usePagination from "../../../hooks/usePagination";
import { ContractSchema } from "../../../types/index";
import AlertDialog from "../../ui/alert-dialog";
import PaginationFooter from "../../ui/pagination-foooter";
import Table from "../../ui/table";
import ContractsTableRows from "./rows";

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

      <Table
        headingElements={["Contrato", "Fecha de Inicio", "Dni", "Finalizado"]}
        body={
          <ContractsTableRows
            contracts={shownContracts}
            onChange={inputChangedHandler}
          />
        }
      />

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
