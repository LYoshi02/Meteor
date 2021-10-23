import {
  Alert as AlertChakra,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";

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
      <AlertTitle mr={2}>{props.title}</AlertTitle>
      <AlertDescription>{props.description}</AlertDescription>
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
