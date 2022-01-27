import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  title: string;
  description: string;
  number: number;
  isLastStep: boolean;
};

const Step = (props: Props) => {
  return (
    <Box flex="1">
      <Flex>
        <Text fontWeight="black" fontSize="7xl" lineHeight="1" color="#5800FF">
          {props.number}
        </Text>
        {props.isLastStep && (
          <Box
            as="hr"
            borderTop="4px dotted #5800FF"
            w="full"
            alignSelf="center"
            ml="4"
            opacity="0.5"
            d={{ base: "none", md: "block" }}
          ></Box>
        )}
      </Flex>
      <Text fontWeight="bold" fontSize="2xl" mt="4">
        {props.title}
      </Text>
      <Text fontSize={{ base: "xl", md: "lg" }} color="gray.200">
        {props.description}
      </Text>
    </Box>
  );
};

export default Step;
