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
import useSWR from "swr";

import DocumentDownload from "../../assets/icons/document-download";
import { InvoiceSchema } from "../../types";
import { formatDateToMonthAndYear } from "../../utils/dateHelpers";
import Alert from "../ui/alert";
import LoadingSpinner from "../ui/loading-spinner";

const Invoices = () => {
  const { data, error } =
    useSWR<{ invoices: InvoiceSchema[] }>("/api/user/invoices");

  const userInvoices: InvoiceSchema[] = data?.invoices || [];

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th textAlign="center">Factura</Th>
            <Th textAlign="center">Mes</Th>
            <Th textAlign="center">Dni</Th>
            <Th textAlign="center">Nro. de Contrato</Th>
            <Th textAlign="center">Estado de Pago</Th>
            <Th textAlign="center">Generar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {userInvoices.map((invoice) => (
            <Tr key={invoice.NroFactura}>
              <Td textAlign="center">{invoice.NroFactura}</Td>
              <Td textAlign="center" textTransform="capitalize">
                {formatDateToMonthAndYear(invoice.PeriodoInicio)}
              </Td>
              <Td textAlign="center">{invoice.DniCliente}</Td>
              <Td textAlign="center">{invoice.NroContrato}</Td>
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
    );
  } else if (error) {
    mainContent = (
      <Alert
        title="Error!"
        description="Se produjo un error, intente más tarde."
        status="error"
      />
    );
  } else {
    mainContent = <LoadingSpinner />;
  }

  return (
    <Box>
      <Heading as="h2">Mis Facturas</Heading>
      <Box height="full" maxWidth="full" overflow="auto" mt="4">
        {mainContent}
      </Box>
    </Box>
  );
};

export default Invoices;
