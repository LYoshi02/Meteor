import { ReactNode } from "react";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

import Link from "../ui/link";
import LogoutIcon from "../../assets/icons/logout";
import useUser from "../../hooks/useUser";

const dashboardItems = [
  { name: "Facturas", path: "/user/invoices" },
  { name: "Title 2", path: "/user" },
];

type Props = {
  children: ReactNode;
};

const DashboardLayout = (props: Props) => {
  const { user } = useUser({});

  let userFullName = "";
  if (user?.data) {
    userFullName = `${user.data.firstName} ${user.data.lastName}`;
  }

  return (
    <Flex>
      <Box w="64" minH="100vh" p="4" bgColor="blackAlpha.700" shadow="md">
        <Flex
          flexDirection="column"
          justify="space-between"
          h="full"
          gridGap="4"
        >
          <Box>
            <Flex width="full" align="center" gridGap="2">
              <Avatar name={userFullName} />
              <Text>{userFullName}</Text>
            </Flex>
            <Box mt="4">
              <Box as="ul" listStyleType="none">
                {dashboardItems.map((item) => (
                  <Box key={item.path} as="li">
                    <Link
                      href={item.path}
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
                      {item.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box>
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
          </Box>
        </Flex>
      </Box>
      <Box p="4" w="full">
        {props.children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
