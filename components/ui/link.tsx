import { ReactNode } from "react";
import NextLink from "next/link";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";

type Props = {
  children: ReactNode;
  href: string;
  styles?: LinkProps;
};

const Link = (props: Props) => {
  return (
    <NextLink href={props.href} passHref>
      <ChakraLink {...props.styles}>{props.children}</ChakraLink>
    </NextLink>
  );
};

export default Link;
