import { Text } from "@chakra-ui/react";

import { ClientSchema } from "../../types";
import ActionButtons from "../ui/action-buttons";
import Modal from "../ui/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
  userExists: ClientSchema | null;
};

const HireModal = (props: Props) => {
  let modalBody: JSX.Element = (
    <>
      <Text>
        Se ha enviado tu contraseña de acceso al correo{" "}
        <Text as="span" fontWeight="bold">
          {props.email}
        </Text>
      </Text>
      <Text>A continuación serás redirigido a la página de login.</Text>
    </>
  );

  if (props.userExists) {
    modalBody = (
      <>
        <Text>
          Ya tienes una cuenta creada bajo el correo{" "}
          <Text as="span" fontWeight="bold">
            {props.userExists.CorreoElectronico}
          </Text>{" "}
          y puedes usarla para ingresar.
        </Text>
        <Text>A continuación serás redirigido a la página de login.</Text>
      </>
    );
  }

  return (
    <Modal
      title="Servicios Contratados Correctamente"
      body={modalBody}
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
