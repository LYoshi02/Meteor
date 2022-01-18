import { Flex, Spinner, Text } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Flex flexDirection="column" alignItems="center" gridGap="2">
      <Spinner size="lg" />
      <Text>Cargando...</Text>
    </Flex>
  );
};

export default LoadingSpinner;
