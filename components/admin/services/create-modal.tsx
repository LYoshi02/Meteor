import {
  Modal,
  ModalContent,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";

import ActionButtons from "../../ui/action-buttons";
import CreateServiceForm from "./create-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateServiceModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Crear Servicio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreateServiceForm onCloseModal={props.onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreateServiceModal;
