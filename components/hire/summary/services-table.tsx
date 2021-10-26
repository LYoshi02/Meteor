import { Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/table";
import { CableService, InternetService } from "../../../types";

type Props = {
  selectedServices: (CableService | InternetService)[];
};

const ServicesTable = (props: Props) => {
  const servicesRows = props.selectedServices.map((service) => (
    <Tr key={service.nroServicio}>
      <Td>1</Td>
      <Td>{service.nombre}</Td>
      <Td isNumeric>{service.precio}</Td>
    </Tr>
  ));

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Cantidad</Th>
          <Th>Descripción</Th>
          <Th isNumeric>Precio</Th>
        </Tr>
      </Thead>
      <Tbody>{servicesRows}</Tbody>
    </Table>
  );
};

export default ServicesTable;
