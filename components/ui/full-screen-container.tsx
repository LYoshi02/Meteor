import { ReactNode } from "react";
import { Box, Center, Container } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
};

const FullScreenContainer = (props: Props) => {
  return (
    <Container py="4" flex="1">
      <Center height="full">
        <Box width="full">{props.children}</Box>
      </Center>
    </Container>
  );
};

export default FullScreenContainer;
