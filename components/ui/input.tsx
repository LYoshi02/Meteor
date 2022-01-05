import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string | JSX.Element;
  type: string;
  hookForm: UseFormRegisterReturn;
  errorMsg: string | undefined;
};

const Input = (props: Props) => {
  return (
    <FormControl id={props.id} isInvalid={props.errorMsg !== undefined}>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <ChakraInput type={props.type} {...props.hookForm} />
      <FormErrorMessage>{props.errorMsg}</FormErrorMessage>
    </FormControl>
  );
};

export default Input;
