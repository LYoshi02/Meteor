import { useDisclosure } from "@chakra-ui/react";
import { useState } from "react";

import PaginationFooter from "../../ui/pagination-foooter";
import usePagination from "../../../hooks/usePagination";
import { PromotionSchema } from "../../../types/index";
import AlertDialog from "../../ui/alert-dialog";
import PromotionsTableRows from "./rows";
import Table from "../../ui/table";

type Props = {
  promotions: (PromotionSchema & { Servicios: string[] })[];
  promotionsCount: number;
  onChangeStatus: (promoNum: number) => void;
};

const PromotionsTable = (props: Props) => {
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.promotionsCount,
    });
  const [savedPromotionNumber, setSavedPromotionNumber] = useState<number>();
  const {
    isOpen: isAlertOpen,
    onOpen: onOpenAlert,
    onClose: onCloseAlert,
  } = useDisclosure();

  const inputChangedHandler = (contractNumber: number) => {
    saveContractNumber(contractNumber);
    onOpenAlert();
  };

  const saveContractNumber = (contractNumber: number | undefined) => {
    setSavedPromotionNumber(contractNumber);
  };

  const changeContractStatus = () => {
    if (savedPromotionNumber) {
      props.onChangeStatus(savedPromotionNumber);
    }
    onCloseAlert();
    setSavedPromotionNumber(undefined);
  };

  const shownPromotions = props.promotions.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  return (
    <>
      <AlertDialog
        title={`Finalizar Promoción ${savedPromotionNumber}`}
        description="¿Desea finalizar la promoción? No podrá revertir el cambio realizado"
        isOpen={isAlertOpen}
        onClose={onCloseAlert}
        actions={{
          primaryBtn: {
            text: "Aceptar",
            action: changeContractStatus,
          },
          secondaryBtn: {
            text: "Cancelar",
            action: onCloseAlert,
          },
        }}
      />

      <Table
        headingElements={[
          "Nro. de Promoción",
          "Nombre",
          "% de Descuento",
          "Duración",
          "Servicios",
          "Finalizado",
        ]}
        body={
          <PromotionsTableRows
            promotions={shownPromotions}
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

export default PromotionsTable;
