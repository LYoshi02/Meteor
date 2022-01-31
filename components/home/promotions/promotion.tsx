import { Box, Button, Divider, Flex, Stack, Text } from "@chakra-ui/react";
import { CheckCircleIcon } from "../../../assets/icons";
import Link from "../../ui/link";

type Props = {
  name: string;
  number: number;
  duration: number;
  discount: number;
  services: string[];
  previousPrice: string;
  finalPrice: string;
  mostPopular?: boolean;
};

const Promotion = (props: Props) => {
  return (
    <Flex
      bgColor="gray.900"
      borderRadius="10"
      p="8"
      shadow="md"
      flex="1"
      position="relative"
      flexDirection="column"
      justifyContent="space-between"
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
      <Box>
        <Flex justify="space-between">
          <Box>
            <Text fontSize="xl" fontWeight="light">
              Pack
            </Text>
            <Text fontWeight="bold" fontSize="2xl">
              {props.name}
            </Text>
          </Box>
          <Box
            bgColor="whiteAlpha.300"
            py="2"
            px="3"
            borderRadius="10"
            height="full"
          >
            {props.duration} Meses
          </Box>
        </Flex>
        <Box my="8">
          <Text
            textDecoration="line-through"
            fontSize="lg"
            lineHeight="1"
            opacity="0.75"
          >
            ${parseInt(props.previousPrice)}
          </Text>
          <Text as="span" fontWeight="bold" fontSize="5xl">
            ${parseInt(props.finalPrice)}
          </Text>
          <Text as="span" fontSize="xl">
            /mes
          </Text>
        </Box>
        <Divider />
        <Stack mt="8" as="ul" listStyleType="none" spacing="6">
          {props.services.sort().map((service) => (
            <Box key={service} as="li" d="flex" alignItems="center" gridGap="4">
              <Box w="7" h="7">
                <CheckCircleIcon />
              </Box>
              <Text fontSize="lg">{service}</Text>
            </Box>
          ))}
        </Stack>
      </Box>
      <Box mt="7">
        <Link href={`/hire?promotion=${props.number}`}>
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
        </Link>
      </Box>
    </Flex>
  );
};

export default Promotion;
