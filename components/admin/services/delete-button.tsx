import { IconButton } from "@chakra-ui/react";

import { TrashIcon } from "../../../assets/icons";

type Props = {
  onClick: () => void;
};

const DeleteButton = (props: Props) => {
  return (
    <IconButton
      colorScheme="red"
      aria-label="Delete Service"
      variant="outline"
      icon={<TrashIcon />}
      w="10"
      h="10"
      p="2"
      onClick={props.onClick}
    />
  );
};

export default DeleteButton;
