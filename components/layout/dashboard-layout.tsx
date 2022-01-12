import { ReactNode } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import UserInfo from "./dashboard/user-info";

import LogoutBtn from "./dashboard/logout-btn";
import DashboardItems from "./dashboard/items";
import { MenuIcon } from "../../assets/icons";

type Props = {
  children: ReactNode;
};

const DashboardLayout = (props: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");

  return (
    <Flex>
      {isLargerThan750 ? (
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
      ) : (
        <Drawer
          isOpen={isOpen}
          placement="right"
          onClose={onClose}
          isFullHeight
        >
          <DrawerOverlay />
          <DrawerContent bgColor="gray.900">
            <DrawerCloseButton top="4" right="4" size="lg" />
            <DrawerHeader>
              <UserInfo />
            </DrawerHeader>

            <DrawerBody>
              <DashboardItems onCloseDrawer={onClose} />
            </DrawerBody>

            <DrawerFooter>
              <LogoutBtn />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <Box p="4" w="full" position="relative">
        {!isLargerThan750 && (
          <Box position="absolute" top="4" right="4">
            <IconButton
              variant="outline"
              colorScheme="white"
              aria-label="Open Drawer"
              size="md"
              p="1"
              icon={<MenuIcon />}
              onClick={onOpen}
            />
          </Box>
        )}
        {props.children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
