import {
  Box,
  Table as ChakraTable,
  TableProps,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type Props = {
  headingElements: string[];
  body: JSX.Element;
  tableConfig?: TableProps;
};

const Table = (props: Props) => {
  let tableConfig: TableProps = {
    variant: "simple",
    width: "full",
  };

  if (props.tableConfig) {
    tableConfig = props.tableConfig;
  }

  return (
    <Box height="full" maxWidth="full" overflow="auto">
      <ChakraTable {...tableConfig}>
        <Thead>
          <Tr>
            {props.headingElements.map((element) => (
              <Th key={element} textAlign="center">
                {element}
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>{props.body}</Tbody>
      </ChakraTable>
    </Box>
  );
};

export default Table;
