import PaginationFooter from "../../ui/pagination-foooter";
import usePagination from "../../../hooks/usePagination";
import { ClientSchema } from "../../../types/index";
import Table from "../../ui/table";
import CustomersTableRows from "./rows";

type Props = {
  customers: ClientSchema[];
  customersCount: number;
  openEditModal: (dni: string) => void;
};

const CustomersTable = (props: Props) => {
  const { pagination, setNextPage, setPrevPage, changePageSize } =
    usePagination({
      totalElements: props.customersCount,
    });

  const shownCustomers = props.customers.slice(
    pagination.elementIndexStart,
    pagination.elementIndexEnd
  );

  return (
    <>
      <Table
        headingElements={[
          "Dni",
          "Nombre Completo",
          "Fecha de Nac.",
          "Dirección",
          "Teléfono",
          "Correo",
          "Acciones",
        ]}
        body={
          <CustomersTableRows
            customers={shownCustomers}
            onOpenModal={props.openEditModal}
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

export default CustomersTable;
