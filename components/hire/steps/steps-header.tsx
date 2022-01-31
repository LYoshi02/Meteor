import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/layout";

type Props = {
  currentStep: number;
};

const stepTitles = ["Tus Datos", "Servicios", "Resumen"];

const StepsHeader = ({ currentStep }: Props) => {
  const steps = stepTitles.map((title, index) => {
    const stepNumber = index + 1;
    let stepColors = {
      main: "purple.600",
      text: "white",
    };

    if (stepNumber < currentStep) {
      stepColors = {
        main: "purple.200",
        text: "purple.900",
      };
    } else if (stepNumber > currentStep) {
      stepColors = {
        main: "gray.300",
        text: "gray.600",
      };
    }

    return (
      <Box
        borderBottom="2px"
        borderColor={stepColors.main}
        pb="2"
        textAlign="center"
        key={title}
      >
        <Flex
          height="12"
          width="12"
          backgroundColor={stepColors.main}
          borderRadius="sm"
          justify="center"
          align="center"
          m="0 auto"
        >
          <Text fontWeight="bold" fontSize="3xl" color={stepColors.text}>
            {index + 1}
          </Text>
        </Flex>
        <Text mt="2" fontWeight="bold">
          {title}
        </Text>
      </Box>
    );
  });

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
