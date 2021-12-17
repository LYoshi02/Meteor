import { Box, Flex } from "@chakra-ui/react";

import Link from "../../ui/link";

type Props = {
  path: string;
  name: string;
  icon: React.ReactElement;
};

const ListItem = (props: Props) => {
  return (
    <Box as="li">
      <Link
        href={props.path}
        styles={{
          fontSize: "lg",
          display: "inline-block",
          w: "full",
          h: "full",
          p: "2",
          borderRadius: "sm",
          cursor: "pointer",
          fontWeight: "bold",
          _hover: { bgColor: "gray.900" },
        }}
      >
        <Flex alignItems="center">
          <Box w="6" h="6" mr="2">
            {props.icon}
          </Box>
          {props.name}
        </Flex>
      </Link>
    </Box>
  );
};

export default ListItem;
