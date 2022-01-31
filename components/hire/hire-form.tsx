import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Box } from "@chakra-ui/react";

import {
  ClientSchema,
  Promotions,
  Services,
  UserFormValues,
} from "../../types";
import useHttp from "../../hooks/useHttp";
import HireModal from "./hire-modal";
import useToastOnReq from "../../hooks/useToastOnReq";
import Steps from "./steps/steps";

type Props = {
  services: Services | undefined;
  promotions: Promotions[] | undefined;
};

const HireForm = (props: Props) => {
  const {
    error: reqError,
    isLoading: reqLoading,
    success: reqSuccess,
    sendRequest,
  } = useHttp();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [existingUser, setExistingUser] = useState<ClientSchema | null>(null);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (reqSuccess) {
      setIsModalOpen(true);
    }
  }, [reqSuccess]);

  useToastOnReq({
    error: {
      showToast: reqError !== null,
      message: reqError?.message,
    },
  });

  const closeModalHandler = () => {
    setIsModalOpen(false);
    router.push("/login");
  };

  const hireServiceHandler = async (
    user: UserFormValues,
    selectedServices: number[]
  ) => {
    await sendRequest<{ message: string; existingUser: ClientSchema | null }>(
      {
        input: "/api/hire",
        init: {
          method: "POST",
          body: JSON.stringify({ user, services: selectedServices }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      },
      (data) => {
        const email = data.existingUser?.CorreoElectronico || user.email;
        setUserEmail(email);
        setExistingUser(data.existingUser);
      }
    );
  };

  return (
    <Box>
      <Steps
        services={props.services}
        promotions={props.promotions}
        isReqLoading={reqLoading}
        onHireService={hireServiceHandler}
      />
      <HireModal
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        email={userEmail}
        userExists={existingUser}
      />
    </Box>
  );
};

export default HireForm;
