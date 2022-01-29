import { Box, IconButton } from "@chakra-ui/react";
import { MenuIcon } from "@heroicons/react/solid";

type Props = {
  onOpen: () => void;
};

const MenuButton = (props: Props) => {
  return (
    <Box position="absolute" top="4" right="4">
      <IconButton
        variant="outline"
        colorScheme="white"
        aria-label="Open Drawer"
        size="md"
        p="1"
        icon={<MenuIcon />}
        onClick={props.onOpen}
      />
    </Box>
  );
};

export default MenuButton;
