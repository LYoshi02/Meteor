import { ReactNode, createContext, useContext } from "react";
import { useToast, UseToastOptions } from "@chakra-ui/react";

interface UiContextInteface {
  showMessage: (status: "error" | "success", message: string) => void;
}

const UiContext = createContext<UiContextInteface>({
  showMessage: () => {},
});

export const useUiContext = () => useContext(UiContext);

type Props = {
  children: ReactNode;
};

const DEFAULT_TOAST_PROPS: UseToastOptions = {
  duration: 9000,
  isClosable: true,
  variant: "solid",
};

const UiProvider = (props: Props) => {
  const toast = useToast();

  const showMessage = (status: "error" | "success", message: string) => {
    toast({
      ...DEFAULT_TOAST_PROPS,
      title: status === "success" ? "Éxito!" : "Error!",
      status,
      description: message,
    });
  };

  const contextValue: UiContextInteface = {
    showMessage,
  };

  return (
    <UiContext.Provider value={contextValue}>
      {props.children}
    </UiContext.Provider>
  );
};

export default UiProvider;
