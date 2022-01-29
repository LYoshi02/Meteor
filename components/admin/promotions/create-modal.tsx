import Modal from "../../ui/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  body: JSX.Element;
};

const CreatePromotionModal = (props: Props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Crear Promoción"
      body={props.body}
      modalConfig={{ isCentered: true, size: "xl" }}
    />
  );
};

export default CreatePromotionModal;
