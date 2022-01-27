import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import Container from "../ui/container";
import astronautSvg from "../../assets/svgs/astronaut.svg";
import Step from "./steps/step";

const stepsDetails = [
  {
    title: "Usuario",
    description: "Completá el formulario con tus datos de usuario",
  },
  { title: "Servicios", description: "Seleccioná tus servicios preferidos" },
  {
    title: "Listo",
    description: "Te enviaremos toda la información a tu correo",
  },
];

const Steps = () => {
  return (
    <Box as="section" pb="72" pt="12" position="relative">
      <Box
        position="absolute"
        top="0"
        right="0"
        transform={{
          base: "rotate(25deg) translate(0%, -40%)",
          md: "rotate(25deg) translate(-20%, -40%)",
          lg: "rotate(25deg) translate(30%, -40%)",
        }}
        opacity="0.1"
        w={{ base: "40", sm: "52", md: "64", lg: "md" }}
      >
        <Image
          src={astronautSvg}
          alt="Astronaut"
          width={239}
          height={324}
          priority
        />
      </Box>
      <Container>
        <Heading
          as="h2"
          fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
          textAlign="center"
          color="white"
          gridColumn={{ base: "1 / -1", md: "3 / 11" }}
        >
          ¿Como Contratar Nuestros Servicios?
        </Heading>
        <Flex
          mt="28"
          gridGap="20"
          gridColumn={{ base: "1 / -1", sm: "2 / 12", lg: "2 / 12" }}
          flexDirection={{ base: "column", md: "row" }}
        >
          {stepsDetails.map((step, index) => (
            <Step
              key={step.title}
              title={step.title}
              description={step.description}
              number={index + 1}
              isLastStep={index + 1 < stepsDetails.length}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Steps;
