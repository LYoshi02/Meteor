import NextLink from "next/link";
import { Avatar, Box, Flex, Link, Text } from "@chakra-ui/react";

import LogoutIcon from "../../assets/icons/logout";
import useUser from "../../hooks/useUser";

const items = [
  { id: 1, name: "Title 1" },
  { id: 2, name: "Title 2" },
];

const DashboardLayout = () => {
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
                {items.map((item) => (
                  <Box
                    key={item.id}
                    as="li"
                    p="2"
                    borderRadius="sm"
                    cursor="pointer"
                    fontWeight="bold"
                    _hover={{ bgColor: "gray.900" }}
                  >
                    {item.name}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
          <Box>
            <NextLink href="/user/logout" passHref>
              <Link
                fontSize="lg"
                fontWeight="bold"
                d="inline-block"
                w="full"
                h="full"
                color="red.500"
                p="2"
                borderRadius="sm"
                _hover={{
                  bgColor: "red.200",
                  color: "red.900",
                  textDecoration: "none",
                }}
              >
                <Flex align="center">
                  <Box w="6" h="6" mr="2">
                    <LogoutIcon />
                  </Box>
                  <Text as="span">Cerrar Sesión</Text>
                </Flex>
              </Link>
            </NextLink>
          </Box>
        </Flex>
      </Box>
      <Box p="4">
        <p>content</p>
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
