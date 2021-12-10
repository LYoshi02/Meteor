import { ReactNode } from "react";
import { Container, Flex, Box } from "@chakra-ui/react";

import Navigation from "../navigation/navigation";

type Props = {
  children?: ReactNode;
};

const Layout = (props: Props) => {
  return (
    <Flex direction="column" height="full">
      <Navigation />
      {props.children}
    </Flex>
  );
};

export default Layout;
