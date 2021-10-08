import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  type: string;
  hookForm?: UseFormRegisterReturn;
};

const InputUI = (props: Props) => {
  return (
    <FormControl id={props.id} mt="2">
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input type={props.type} {...props.hookForm} />
    </FormControl>
  );
};

export default InputUI;
