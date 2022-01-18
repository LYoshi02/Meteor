import { UseToastOptions } from "@chakra-ui/react";

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const USER_ROLE = 1;
export const ADMIN_ROLE = 2;

export const DEFAULT_ERROR_TOAST_PROPS: UseToastOptions = {
  title: "Error!",
  description: "Se produjo un error",
  status: "error",
  duration: 9000,
  isClosable: true,
  variant: "solid",
};
