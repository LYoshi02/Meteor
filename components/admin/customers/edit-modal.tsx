import { Box } from "@chakra-ui/react";
import Modal from "../../ui/modal";
import EditCustomerForm from "./edit-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  customerDni: string;
  body: JSX.Element;
};

const EditCustomerModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Editar Cliente"
      body={props.body}
      modalConfig={{ size: "xl" }}
    />
  );
};

export default EditCustomerModal;
