import { Box, Flex, Text } from "@chakra-ui/react";

import { LogoutIcon } from "../../../assets/icons/index";
import Link from "../../ui/link";

const LogoutBtn = () => {
  return (
    <Link
      href="/user/logout"
      styles={{
        fontSize: "lg",
        fontWeight: "bold",
        display: "inline-block",
        w: "full",
        h: "full",
        color: "red.500",
        p: "2",
        borderRadius: "sm",
        _hover: {
          bgColor: "red.200",
          color: "red.900",
          textDecoration: "none",
        },
      }}
    >
      <Flex align="center">
        <Box w="6" h="6" mr="2">
          <LogoutIcon />
        </Box>
        <Text as="span">Cerrar Sesión</Text>
      </Flex>
    </Link>
  );
};

export default LogoutBtn;
