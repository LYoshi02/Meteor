import { InvoiceSchema } from "../../../types";
import usePagination from "../../../hooks/usePagination";
import PaginationFooter from "../../ui/pagination-foooter";
import Table from "../../ui/table";
import InvoicesTableRows from "./rows";

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
      <Table
        headingElements={["Factura", "Mes", "Dni", "Pagado"]}
        body={
          <InvoicesTableRows
            invoices={shownInvoices}
            onChange={props.onChangeStatus}
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

export default InvoicesTable;
