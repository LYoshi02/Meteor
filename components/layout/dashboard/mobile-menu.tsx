import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import UserInfo from "./user-info";
import LogoutBtn from "./logout-btn";
import DashboardItems from "./items";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const MobileMenu = (props: Props) => {
  return (
    <Drawer
      isOpen={props.isOpen}
      placement="right"
      onClose={props.onClose}
      isFullHeight
    >
      <DrawerOverlay />
      <DrawerContent bgColor="gray.900" h="100%">
        <DrawerCloseButton top="4" right="4" size="lg" />
        <DrawerHeader>
          <UserInfo />
        </DrawerHeader>

        <DrawerBody>
          <DashboardItems onCloseDrawer={props.onClose} />
        </DrawerBody>

        <DrawerFooter>
          <LogoutBtn />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
