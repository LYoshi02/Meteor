import { Box, Flex, Stack } from "@chakra-ui/react";
import Image from "next/image";

import Container from "../ui/container";
import logoSvg from "../../assets/svgs/logo.svg";
import SocialMedia from "./footer/social-media";
import List from "./footer/list";

const Footer = () => {
  return (
    <Box as="footer" bgColor="#0B0D17" py="24">
      <Container>
        <Flex
          justify="space-between"
          gridColumn="1 / -1"
          flexDirection={{ base: "column", md: "row" }}
        >
          <Box>
            <Box>
              <Image src={logoSvg} alt="Meteor Logo" width={186} height={47} />
            </Box>
            <SocialMedia />
          </Box>
          <Stack
            d={{ base: "flex", md: "inline-flex" }}
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent={{ base: "space-between" }}
            gridGap={{ md: "16" }}
            mt={{ base: "16", md: "0" }}
            spacing={{ base: "12", sm: "0" }}
          >
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
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Footer;
