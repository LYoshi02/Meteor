import Table from "../../ui/table";
import PaginationFooter from "../../ui/pagination-foooter";
import InvoicesTableRows from "./rows";
import { InvoiceSchema } from "../../../types";
import usePagination from "../../../hooks/usePagination";

type Props = {
  invoices: InvoiceSchema[];
  invoicesCount: number;
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
      <Table
        headingElements={[
          "Factura",
          "Mes",
          "Dni",
          "Nro. de Contrato",
          "Estado de Pago",
          "Generar",
        ]}
        body={<InvoicesTableRows invoices={shownInvoices} />}
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

export default InvoicesTable;
