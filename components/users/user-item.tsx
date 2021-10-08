import { Avatar } from "@chakra-ui/avatar";
import { IconButton } from "@chakra-ui/button";
import { Box, Divider, ListItem, Text } from "@chakra-ui/layout";
import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/menu";

import DotsVertical from "../../assets/icons/DotsVertical";

type Props = {
  name: string;
  dni: string;
};

const UserItem = (props: Props) => {
  return (
    <ListItem>
      <Box
        display="flex"
        alignItems="center"
        p="4"
        borderRadius="sm"
        cursor="pointer"
        _hover={{
          backgroundColor: "gray.600",
        }}
        transitionDuration="300ms"
      >
        <Avatar name={props.name} />
        <Box ml="2">
          <Text fontSize="xl" fontWeight="bold">
            {props.name}
          </Text>
          <Text fontSize="sm" color="whiteAlpha.800">
            DNI: {props.dni}
          </Text>
        </Box>
        <Box ml="auto">
          <Menu>
            <MenuButton
              as={IconButton}
              fontSize="10px"
              p="2"
              icon={<DotsVertical />}
            />
            <MenuList>
              <MenuItem>Información</MenuItem>
              <MenuItem>Editar</MenuItem>
              <MenuItem color="red.500">Dar de Baja</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Divider />
    </ListItem>
  );
};

export default UserItem;
