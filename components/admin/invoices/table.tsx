import { Box, Table, Tbody, Td, Th, Thead, Tr, Switch } from "@chakra-ui/react";

import { InvoiceSchema } from "../../../types";
import usePagination from "../../../hooks/usePagination";
import PaginationFooter from "../../ui/pagination-foooter";
import { formatDateToMonthAndYear } from "../../../utils/dateHelpers";

type Props = {
  invoices: InvoiceSchema[];
  invoicesCount: number;
  onChangeStatus: (isPaid: boolean, invoiceNumber: number) => void;
};

const InvoicesTable = (props: Props) => {
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.invoicesCount,
    });

  const shownInvoices = props.invoices.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  return (
    <>
      <Box height="full" maxWidth="full" overflow="auto">
        <Table variant="simple" w="full">
          <Thead>
            <Tr>
              <Th textAlign="center">Factura</Th>
              <Th textAlign="center">Mes</Th>
              <Th textAlign="center">Dni</Th>
              <Th textAlign="center">Pagado</Th>
            </Tr>
          </Thead>
          <Tbody>
            {shownInvoices.map((invoice) => (
              <Tr key={invoice.NroFactura}>
                <Td textAlign="center">{invoice.NroFactura}</Td>
                <Td textAlign="center" textTransform="capitalize">
                  {formatDateToMonthAndYear(invoice.PeriodoInicio)}
                </Td>
                <Td textAlign="center">{invoice.DniCliente}</Td>
                <Td textAlign="center">
                  <Switch
                    defaultChecked={invoice.FechaFacturacion !== null}
                    onChange={(e) =>
                      props.onChangeStatus(e.target.checked, invoice.NroFactura)
                    }
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

export default InvoicesTable;
