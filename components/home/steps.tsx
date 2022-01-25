import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";

import astronautSvg from "../../assets/svgs/astronaut.svg";

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
    <Grid
      as="section"
      templateColumns="repeat(12, 1fr)"
      alignContent="center"
      pb="72"
      pt="12"
      position="relative"
    >
      <Box
        position="absolute"
        top="0"
        right="0"
        transform="rotate(25deg) translateX(50%) translateY(-60%)"
        opacity="0.1"
      >
        <Image src={astronautSvg} alt="Astronaut" width={263} height={356} />
      </Box>
      <Heading
        as="h2"
        fontSize="5xl"
        textAlign="center"
        color="white"
        gridColumn="3 / 11"
      >
        ¿Como Contratar Nuestros Servicios?
      </Heading>
      <Flex mt="28" gridGap="20" gridColumn="2 / 12">
        {stepsDetails.map((step, index) => (
          <Box key={step.title} flex="1">
            <Flex>
              <Text
                fontWeight="black"
                fontSize="7xl"
                lineHeight="1"
                color="#5800FF"
              >
                {index + 1}
              </Text>
              {index + 1 < stepsDetails.length && (
                <Box
                  as="hr"
                  borderTop="4px dotted #5800FF"
                  w="full"
                  alignSelf="center"
                  ml="4"
                ></Box>
              )}
            </Flex>
            <Text fontWeight="bold" fontSize="2xl" mt="4">
              {step.title}
            </Text>
            <Text fontSize="lg" color="gray.200">
              {step.description}
            </Text>
          </Box>
        ))}
      </Flex>
    </Grid>
  );
};

export default Steps;
