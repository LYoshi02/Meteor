import { ReactNode } from "react";
import { Container as ChakraContainer, ContainerProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  config?: ContainerProps;
};

const Container = (props: Props) => {
  return (
    <ChakraContainer
      d="grid"
      maxW="container.xl"
      gridTemplateColumns="repeat(12, 1fr)"
      {...props.config}
    >
      {props.children}
    </ChakraContainer>
  );
};

export default Container;
