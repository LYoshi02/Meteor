import Modal from "../../ui/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  body: JSX.Element;
};

const ServiceModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={props.isEditing ? "Editar Servicio" : "Crear Servicio"}
      body={props.body}
      modalConfig={{ isCentered: true, size: "xl" }}
    />
  );
};

export default ServiceModal;
