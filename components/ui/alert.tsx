import {
  Alert as AlertChakra,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import { Box } from "@chakra-ui/react";

type Props = {
  status?: "success" | "warning" | "error" | "info" | undefined;
  title?: string;
  description?: string;
  onClose: () => void;
};

const Alert = (props: Props) => {
  return (
    <AlertChakra status={props.status}>
      <AlertIcon />
      <Box flex="1">
        <AlertTitle mr={2}>{props.title}</AlertTitle>
        <AlertDescription display="block">{props.description}</AlertDescription>
      </Box>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={props.onClose}
      />
    </AlertChakra>
  );
};

export default Alert;
