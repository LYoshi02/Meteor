import { ReactNode } from "react";
import {
  Table as ChakraTable,
  TableProps,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

type Props = {
  headItems: string[];
  footItems?: string[];
  body: { id: string; [key: string]: string | number }[];
  tableProps?: TableProps;
  centerItems?: boolean;
};

const Table = (props: Props) => {
  let footElement: ReactNode;

  if (props.footItems) {
    footElement = (
      <Tfoot>
        <Tr>
          {props.footItems.map((item) => (
            <Th key={item} textAlign={props.centerItems ? "center" : "initial"}>
              {item}
            </Th>
          ))}
        </Tr>
      </Tfoot>
    );
  }

  return (
    <ChakraTable {...props.tableProps}>
      <Thead>
        {props.headItems.map((title) => (
          <Th key={title} textAlign={props.centerItems ? "center" : "initial"}>
            {title}
          </Th>
        ))}
      </Thead>
      <Tbody>
        {props.body.map((obj) => (
          <Tr key={obj.id}>
            {Object.keys(obj)
              .filter((key) => key !== "id")
              .map((key) => (
                <Td
                  key={key}
                  textAlign={props.centerItems ? "center" : "initial"}
                >
                  {obj[key]}
                </Td>
              ))}
          </Tr>
        ))}
      </Tbody>
      {footElement}
    </ChakraTable>
  );
};

export default Table;
