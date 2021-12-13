import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import DocumentDownload from "../../assets/icons/document-download";

const Invoices = () => {
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
        <Tr>
          <Td textAlign="center">10000</Td>
          <Td textAlign="center">Diciembre - 2021</Td>
          <Td textAlign="center">44278506</Td>
          <Td textAlign="center">Adeuda</Td>
          <Td textAlign="center" h="16" cursor="pointer">
            <DocumentDownload />
          </Td>
        </Tr>
      </Tbody>
    </Table>
  );
};

export default Invoices;
