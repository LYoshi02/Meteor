import { useEffect, useRef } from "react";
import { useToast, ToastId, UseToastOptions } from "@chakra-ui/react";
import { useUiContext } from "../context/ui-context";

type Params = {
  success?: {
    showToast: boolean;
    message?: string;
  };
  error?: {
    showToast: boolean;
    message?: string;
  };
};

const useToastOnReq = ({ error, success }: Params) => {
  const { showMessage } = useUiContext();

  useEffect(() => {
    if (error?.showToast) {
      const message = error?.message || "Se produjo un error";
      showMessage("error", message);
    }
  }, [error?.showToast, error?.message, showMessage]);

  useEffect(() => {
    if (success?.showToast) {
      const message = success?.message || "";
      showMessage("success", message);
    }
  }, [success?.showToast, success?.message, showMessage]);
};

export default useToastOnReq;
