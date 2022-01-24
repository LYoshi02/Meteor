import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Switch,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

import PaginationFooter from "../../ui/pagination-foooter";
import usePagination from "../../../hooks/usePagination";
import { PromotionSchema } from "../../../types/index";
import AlertDialog from "../../ui/alert-dialog";

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
      <Box height="full" maxWidth="full" overflow="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th textAlign="center">Nro. de Promoción</Th>
              <Th textAlign="center">% de Descuento</Th>
              <Th textAlign="center">Duración</Th>
              <Th textAlign="center">Servicios</Th>
              <Th textAlign="center">Finalizado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shownPromotions.map((promo) => (
              <Tr key={promo.NroPromocion}>
                <Td textAlign="center">{promo.NroPromocion}</Td>
                <Td textAlign="center">{promo.PorcentajeDto} %</Td>
                <Td textAlign="center">{promo.Duracion} Meses</Td>
                <Td textAlign="center">
                  {promo.Servicios.map((service) => (
                    <Text key={service}>{service}</Text>
                  ))}
                </Td>
                <Td textAlign="center">
                  <Switch
                    isChecked={promo.Finalizado}
                    isDisabled={promo.Finalizado}
                    onChange={() => inputChangedHandler(promo.NroPromocion)}
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

export default PromotionsTable;
