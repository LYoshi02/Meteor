import { useEffect, useState } from "react";
import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { format } from "date-fns";
import esLocale from "date-fns/locale/es";

import DocumentDownload from "../../assets/icons/document-download";
import useUser from "../../hooks/useUser";
import fetchJson from "../../utils/fetchJson";
import { InvoiceSchema } from "../../types";

const Invoices = () => {
  const { user } = useUser({});
  const [userInvoices, setUserInvoices] = useState<InvoiceSchema[]>([]);

  useEffect(() => {
    if (user && user.data?.dni) {
      fetchJson<{ invoices: InvoiceSchema[] }>("/api/invoices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: user.data.dni }),
      }).then((res) => {
        setUserInvoices(res.invoices);
      });
    }
  }, [user]);

  return (
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
                href={`/api/invoices/${invoice.NroFactura}`}
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
};

export default Invoices;
