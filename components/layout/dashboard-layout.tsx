import { ReactNode } from "react";
import { Box, Flex } from "@chakra-ui/react";

import UserInfo from "./dashboard/user-info";

import LogoutBtn from "./dashboard/logout-btn";
import UserDashboardItems from "./dashboard/user-items";

type Props = {
  children: ReactNode;
};

const DashboardLayout = (props: Props) => {
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
            <UserInfo />
            <Box mt="4">
              <UserDashboardItems />
            </Box>
          </Box>

          <Box>
            <LogoutBtn />
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
