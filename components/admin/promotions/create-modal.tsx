import Modal from "../../ui/modal";
import CreatePromotionForm from "./create-form";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreatePromotionModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Crear Promoción"
      body={<CreatePromotionForm onCloseModal={props.onClose} />}
      modalConfig={{ isCentered: true, size: "xl" }}
    />
  );
};

export default CreatePromotionModal;
