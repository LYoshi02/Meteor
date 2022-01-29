import { Badge, Td, Tr } from "@chakra-ui/react";
import { DocumentDownloadIcon } from "@heroicons/react/solid";

import { InvoiceSchema } from "../../../types";
import { formatDateToMonthAndYear } from "../../../utils/dateHelpers";
import Link from "../../ui/link";

type Props = {
  invoices: InvoiceSchema[];
};

const InvoicesTableRows = (props: Props) => {
  return (
    <>
      {props.invoices.map((invoice) => (
        <Tr key={invoice.NroFactura}>
          <Td textAlign="center">{invoice.NroFactura}</Td>
          <Td textAlign="center" textTransform="capitalize">
            {formatDateToMonthAndYear(invoice.PeriodoInicio)}
          </Td>
          <Td textAlign="center">{invoice.DniCliente}</Td>
          <Td textAlign="center">{invoice.NroContrato}</Td>
          <Td textAlign="center">
            {invoice.FechaFacturacion ? (
              <Badge colorScheme="green">Pagado</Badge>
            ) : (
              <Badge colorScheme="red">Adeuda</Badge>
            )}
          </Td>
          <Td textAlign="center" cursor="pointer">
            <Link
              href={`/api/user/invoices/${invoice.NroFactura}`}
              styles={{
                target: "_blank",
                rel: "noreferrer",
                h: "8",
                w: "8",
                d: "inline-block",
              }}
            >
              <DocumentDownloadIcon />
            </Link>
          </Td>
        </Tr>
      ))}
    </>
  );
};

export default InvoicesTableRows;
