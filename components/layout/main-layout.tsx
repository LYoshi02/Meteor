import { ReactNode } from "react";
import { Flex } from "@chakra-ui/react";

import Navigation from "./navigation";

type Props = {
  children?: ReactNode;
};

const MainLayout = (props: Props) => {
  return (
    <Flex direction="column" height="full">
      <Navigation />
      {props.children}
    </Flex>
  );
};

export default MainLayout;
