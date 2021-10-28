import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";

type Props = {
  currentStep: number;
};

const stepTitles = ["Tus Datos", "Servicios", "Resumen"];

const StepsHeader = (props: Props) => {
  const steps = stepTitles.map((title, index) => (
    <Box
      borderBottom="2px"
      borderColor={index + 1 === props.currentStep ? "teal.400" : "gray.300"}
      pb="2"
      textAlign="center"
      key={title}
    >
      <Flex
        height="12"
        width="12"
        backgroundColor={
          index + 1 === props.currentStep ? "teal.400" : "gray.300"
        }
        borderRadius="sm"
        justify="center"
        align="center"
        m="0 auto"
      >
        <Text
          fontWeight="bold"
          fontSize="3xl"
          color={index + 1 === props.currentStep ? "white" : "gray.600"}
        >
          {index + 1}
        </Text>
      </Flex>
      <Text mt="2" fontWeight="bold">
        {title}
      </Text>
    </Box>
  ));

  return (
    <SimpleGrid columns={3} spacingX="1" mb="4">
      {steps}
    </SimpleGrid>
  );
};

export default StepsHeader;

{
  /* <Box borderBottom="2px" borderColor="gray.200" pb="2" textAlign="center">
        <Flex
          height="12"
          width="12"
          backgroundColor="gray.300"
          borderRadius="sm"
          justify="center"
          align="center"
          m="0 auto"
        >
          <Text fontWeight="bold" fontSize="3xl" color="gray.600">
            2
          </Text>
        </Flex>
        <Text mt="2">Servicios</Text>
      </Box> */
}
