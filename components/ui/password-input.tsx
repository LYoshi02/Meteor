import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  id: string;
  label: string;
  hookForm: UseFormRegisterReturn;
  errorMsg: string | undefined;
};

const PasswordInput = (props: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const onClickHandler = () => {
    setShowPassword((prevValue) => !prevValue);
  };

  return (
    <FormControl id={props.id} isInvalid={props.errorMsg !== undefined}>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <InputGroup>
        <ChakraInput
          pr="5.5rem"
          type={showPassword ? "text" : "password"}
          {...props.hookForm}
        />
        <InputRightElement width="4.5rem" mr="2">
          <Button h="1.75rem" size="sm" onClick={onClickHandler}>
            {showPassword ? "Ocultar" : "Mostrar"}
          </Button>
        </InputRightElement>
      </InputGroup>

      <FormErrorMessage>{props.errorMsg}</FormErrorMessage>
    </FormControl>
  );
};

export default PasswordInput;
