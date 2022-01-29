import { ReactNode } from "react";
import { Box, Flex, useDisclosure, useMediaQuery } from "@chakra-ui/react";

import DesktopMenu from "./dashboard/desktop-menu";
import MobileMenu from "./dashboard/mobile-menu";
import MenuButton from "./dashboard/menu-button";

type Props = {
  children: ReactNode;
};

const DashboardLayout = (props: Props) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isLargerThan750] = useMediaQuery("(min-width: 750px)");

  return (
    <Flex>
      {isLargerThan750 ? (
        <DesktopMenu />
      ) : (
        <MobileMenu isOpen={isOpen} onClose={onClose} />
      )}

      <Box p="4" w="full" position="relative" overflowX="hidden">
        {!isLargerThan750 && <MenuButton onOpen={onOpen} />}
        {props.children}
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
