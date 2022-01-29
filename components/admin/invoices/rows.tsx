import { Switch, Td, Tr } from "@chakra-ui/react";

import { InvoiceSchema } from "../../../types";
import { formatDateToMonthAndYear } from "../../../utils/dateHelpers";

type Props = {
  invoices: InvoiceSchema[];
  onChange: (isPaid: boolean, invoiceNumber: number) => void;
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
          <Td textAlign="center">
            <Switch
              defaultChecked={invoice.FechaFacturacion !== null}
              onChange={(e) =>
                props.onChange(e.target.checked, invoice.NroFactura)
              }
            />
          </Td>
        </Tr>
      ))}
    </>
  );
};

export default InvoicesTableRows;
