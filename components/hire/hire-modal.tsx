import { Text } from "@chakra-ui/react";
import ActionButtons from "../ui/action-buttons";
import Modal from "../ui/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
};

const HireModal = (props: Props) => {
  return (
    <Modal
      title="Servicios Contratados Correctamente"
      body={
        <>
          <Text>
            Se ha enviado tu contraseña de acceso al correo{" "}
            <Text as="span" fontWeight="bold">
              {props.email}
            </Text>
          </Text>
          <Text>A continuación serás redirigido a la página de login.</Text>
        </>
      }
      isOpen={props.isOpen}
      onClose={props.onClose}
      modalConfig={{
        isCentered: true,
        closeOnOverlayClick: false,
      }}
      modalFooterEl={
        <ActionButtons
          primaryBtn={{
            text: "Aceptar",
            action: props.onClose,
          }}
        />
      }
    />
  );
};

export default HireModal;
