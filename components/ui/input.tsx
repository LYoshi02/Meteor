import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  type: string;
  hookForm: UseFormRegisterReturn;
  errorMsg: string | undefined;
};

const InputUI = (props: Props) => {
  return (
    <FormControl id={props.id} isInvalid={props.errorMsg !== undefined}>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input type={props.type} {...props.hookForm} />
      <FormErrorMessage>{props.errorMsg}</FormErrorMessage>
    </FormControl>
  );
};

export default InputUI;
