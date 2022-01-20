import Modal from "../../ui/modal";
import CreateServiceForm from "./create-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateServiceModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Crear Servicio"
      body={<CreateServiceForm onCloseModal={props.onClose} />}
      modalConfig={{ isCentered: true, size: "xl" }}
    />
  );
};

export default CreateServiceModal;
