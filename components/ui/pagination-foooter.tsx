import { Button, Text, Select, Flex } from "@chakra-ui/react";
import { ChangeEvent } from "react";

type Props = {
  pagination: {
    canNextPage: boolean;
    canPrevPage: boolean;
    currentPage: number;
    pageCount: number;
  };
  onSetPrevPage: () => void;
  onSetNextPage: () => void;
  onChangePageSize: (newSize: number) => void;
  pageSizes?: number[];
};

const DEFAULT_PAGE_SIZES = [10, 25, 50, 100];

const PaginationFooter = ({
  pagination,
  onSetPrevPage,
  onSetNextPage,
  onChangePageSize,
  pageSizes = DEFAULT_PAGE_SIZES,
}: Props) => {
  return (
    <Flex
      mt="4"
      flexDirection={{ base: "column", sm: "row" }}
      justify={{ sm: "space-between" }}
      gridGap={{ base: "4", sm: "0" }}
    >
      <Flex align="center">
        <Button
          variant="outline"
          onClick={onSetPrevPage}
          isDisabled={!pagination.canPrevPage}
        >
          Ant
        </Button>
        <Button
          variant="outline"
          ml="2"
          onClick={onSetNextPage}
          isDisabled={!pagination.canNextPage}
        >
          Sig
        </Button>
        <Text as="span" ml="2">
          Pag. {pagination.currentPage} de {pagination.pageCount}
        </Text>
      </Flex>
      <Flex align="center">
        <Text as="span" mr="2">
          Mostrar
        </Text>
        <Select w="20" onChange={(e) => onChangePageSize(+e.target.value)}>
          {pageSizes.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </Select>
      </Flex>
    </Flex>
  );
};

export default PaginationFooter;
