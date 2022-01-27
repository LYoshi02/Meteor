import { IconButton } from "@chakra-ui/react";

import { PencilIcon } from "../../../assets/icons";

type Props = {
  onClick: () => void;
};

const EditButton = (props: Props) => {
  return (
    <IconButton
      colorScheme="purple"
      aria-label="Delete Service"
      variant="outline"
      icon={<PencilIcon />}
      w="10"
      h="10"
      p="2"
      onClick={props.onClick}
    />
  );
};

export default EditButton;
