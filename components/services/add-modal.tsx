import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

import AddServiceForm from "./add-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AddServiceModal = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Nuevo Servicio</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <AddServiceForm />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddServiceModal;
