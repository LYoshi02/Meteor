import { IconButton } from "@chakra-ui/react";

import { PencilIcon } from "../../../assets/icons";

type Props = {
  onClick: () => void;
};

const DeleteButton = (props: Props) => {
  return (
    <IconButton
      colorScheme="purple"
      aria-label="Edit Service"
      variant="outline"
      icon={<PencilIcon />}
      w="10"
      h="10"
      p="2"
      onClick={props.onClick}
    />
  );
};

export default DeleteButton;
