import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "../../../assets/icons";

type Props = {
  mostPopular?: boolean;
};

const Promotion = (props: Props) => {
  return (
    <Box
      bgColor="gray.900"
      borderRadius="10"
      p="8"
      shadow="md"
      flex="1"
      position="relative"
    >
      {props.mostPopular && (
        <Box
          bgColor="whiteAlpha.800"
          py="1"
          px="3"
          borderRadius="10"
          position="absolute"
          top="-4"
          right="8"
          d="inline-block"
        >
          <Text
            bgGradient="linear(to-r, #EC008C, #FC6767)"
            bgClip="text"
            fontWeight="bold"
            textTransform="uppercase"
          >
            Más Popular
          </Text>
        </Box>
      )}
      <Flex justify="space-between">
        <Box>
          <Text fontSize="xl" fontWeight="light">
            Pack
          </Text>
          <Text fontWeight="bold" fontSize="2xl">
            Básico
          </Text>
        </Box>
        <Box
          bgColor="whiteAlpha.300"
          py="2"
          px="3"
          borderRadius="10"
          height="full"
        >
          3 Meses
        </Box>
      </Flex>
      <Box my="8">
        <Text as="span" fontWeight="bold" fontSize="5xl">
          $199
        </Text>
        <Text as="span" fontSize="xl">
          /mes
        </Text>
      </Box>
      <Divider />
      <Stack mt="8" as="ul" listStyleType="none" spacing="6">
        <Box as="li" d="flex" alignItems="center" gridGap="4">
          <Box w="7" h="7">
            <CheckCircleIcon />
          </Box>
          <Text fontSize="lg">Nombre del Servicio</Text>
        </Box>

        <Box as="li" d="flex" alignItems="center" gridGap="4">
          <Box w="7" h="7">
            <CheckCircleIcon />
          </Box>
          <Text fontSize="lg">Nombre del Servicio</Text>
        </Box>

        <Box as="li" d="flex" alignItems="center" gridGap="4">
          <Box w="7" h="7">
            <CheckCircleIcon />
          </Box>
          <Text fontSize="lg">Nombre del Servicio</Text>
        </Box>
      </Stack>
      <Box mt="7">
        {props.mostPopular ? (
          <Button
            bgGradient="linear(to-r, #EC008C, #FC6767)"
            _hover={{}}
            isFullWidth
            fontSize="lg"
          >
            Contratar
          </Button>
        ) : (
          <Button isFullWidth fontSize="lg">
            Contratar
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Promotion;
