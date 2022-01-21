import {
  Modal as ChakraModal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalFooter,
  ModalCloseButton,
} from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  body?: ReactNode;
  modalConfig?: any;
  modalFooterEl?: JSX.Element;
};

const Modal = (props: Props) => {
  return (
    <ChakraModal
      isOpen={props.isOpen}
      onClose={props.onClose}
      {...props.modalConfig}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.title}</ModalHeader>
        <ModalCloseButton />
        {props.body && <ModalBody>{props.body}</ModalBody>}
        {props.modalFooterEl && (
          <ModalFooter>{props.modalFooterEl}</ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  );
};

export default Modal;
