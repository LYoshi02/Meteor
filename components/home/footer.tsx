import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import Image from "next/image";

import Container from "../ui/container";
import logoSvg from "../../assets/svgs/logo.svg";
import SocialMedia from "./footer/social-media";
import Link from "../ui/link";
import List from "./footer/list";

const Footer = () => {
  return (
    <Box as="footer" bgColor="#0B0D17" py="24">
      <Container>
        <Flex justify="space-between" gridColumn="1 / -1">
          <Box>
            <Box>
              <Image src={logoSvg} alt="Meteor Logo" width={186} height={47} />
            </Box>
            <SocialMedia />
          </Box>
          <Box d="inline-flex" gridGap="16">
            <List
              title="Empresa"
              items={[
                "Sobre Nostros",
                "Blog",
                "Contactanos",
                "Precios",
                "Testimonios",
              ]}
            />
            <List
              title="Soporte"
              items={[
                "Centro de Ayuda",
                "Términos del Servicio",
                "Legal",
                "Política de Privacidad",
                "Estado",
              ]}
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
