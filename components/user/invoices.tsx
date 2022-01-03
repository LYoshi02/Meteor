import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";
import useSWR from "swr";

import DocumentDownload from "../../assets/icons/document-download";
import { InvoiceSchema } from "../../types";

const Invoices = () => {
  const { data } = useSWR<{ invoices: InvoiceSchema[] }>("/api/user/invoices");

  const userInvoices: InvoiceSchema[] = data?.invoices || [];

  return (
    <Box>
      <Heading as="h2">Mis Facturas</Heading>
      <Table variant="simple" mt="4">
        <Thead>
          <Tr>
            <Th textAlign="center">Factura</Th>
            <Th textAlign="center">Mes</Th>
            <Th textAlign="center">Dni</Th>
            <Th textAlign="center">Estado de Pago</Th>
            <Th textAlign="center">Generar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userInvoices.map((invoice) => (
            <Tr key={invoice.NroFactura}>
              <Td textAlign="center">{invoice.NroFactura}</Td>
              <Td textAlign="center" textTransform="capitalize">
                {format(new Date(invoice.PeriodoInicio), "MMMM - yyyy", {
                  locale: esLocale,
                })}
              </Td>
              <Td textAlign="center">{invoice.DniCliente}</Td>
              <Td textAlign="center">
                {invoice.FechaFacturacion ? "Pagado" : "Adeuda"}
              </Td>
              <Td textAlign="center" h="16" cursor="pointer">
                <a
                  href={`/api/user/invoices/${invoice.NroFactura}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <DocumentDownload />
                </a>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Invoices;
