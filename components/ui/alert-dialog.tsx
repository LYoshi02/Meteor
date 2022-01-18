import {
  AlertDialog as ChakraAlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
  ButtonOptions,
} from "@chakra-ui/react";
import { useRef } from "react";

import ActionButtons from "./action-buttons";

type Props = {
  title: string;
  description?: string;
  onClose: () => void;
  isOpen: boolean;
  actions: {
    primaryBtn: {
      text: string;
      action?: () => unknown;
      btnConfig?: ButtonOptions;
    };
    secondaryBtn?: {
      text: string;
      action?: () => unknown;
      btnConfig?: ButtonOptions;
    };
  };
};

const AlertDialog = (props: Props) => {
  const cancelRef = useRef<HTMLButtonElement>(null);

  return (
    <ChakraAlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
      isOpen={props.isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{props.title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        {props.description && (
          <AlertDialogBody>{props.description}</AlertDialogBody>
        )}
        <AlertDialogFooter>
          <ActionButtons {...props.actions} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </ChakraAlertDialog>
  );
};

export default AlertDialog;
