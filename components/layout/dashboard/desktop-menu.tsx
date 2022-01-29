import { Box, Flex } from "@chakra-ui/react";

import UserInfo from "./user-info";
import LogoutBtn from "./logout-btn";
import DashboardItems from "./items";

const DesktopMenu = () => {
  return (
    <Box minH="100vh" w="80" bgColor="gray.900" shadow="md">
      <Flex
        flexDirection="column"
        justify="space-between"
        h="100vh"
        p="4"
        gridGap="4"
        position="sticky"
        top="0"
      >
        <Box>
          <UserInfo />
          <Box mt="8">
            <DashboardItems />
          </Box>
        </Box>

        <Box>
          <LogoutBtn />
        </Box>
      </Flex>
    </Box>
  );
};

export default DesktopMenu;
