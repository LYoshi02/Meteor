import { Box, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

import PaginationFooter from "../../ui/pagination-foooter";
import usePagination from "../../../hooks/usePagination";
import { PromotionSchema } from "../../../types/index";

type Props = {
  promotions: PromotionSchema[];
  promotionsCount: number;
};

const PromotionsTable = (props: Props) => {
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.promotionsCount,
    });

  const shownPromotions = props.promotions.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  return (
    <>
      <Box height="full" maxWidth="full" overflow="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th textAlign="center">Nro. de Promoción</Th>
              <Th textAlign="center">% de Descuento</Th>
              <Th textAlign="center">Duración</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shownPromotions.map((promo) => (
              <Tr key={promo.NroPromocion}>
                <Td textAlign="center">{promo.NroPromocion}</Td>
                <Td textAlign="center">{promo.PorcentajeDto} %</Td>
                <Td textAlign="center">{promo.Duracion}</Td>
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
