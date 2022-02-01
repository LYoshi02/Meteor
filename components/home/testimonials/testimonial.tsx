import { Box, Flex, Text } from "@chakra-ui/react";
import Image from "next/image";

type Props = {
  text: string;
  author: {
    name: string;
    job: string;
    imgUrl: string;
  };
};
const Testimonial = (props: Props) => {
  return (
    <Box mx="4">
      <Box
        bgColor="gray.100"
        borderRadius="10"
        py="8"
        px={{ base: "4", md: "8" }}
        color="gray.900"
        position="relative"
        zIndex="10"
        shadow="lg"
      >
        <Flex gridGap="3" align="center" mb="6">
          <Box position="relative" w="16" h="16">
            <Image
              src={props.author.imgUrl}
              alt={props.author.name}
              layout="fill"
              objectFit="contain"
            />
          </Box>
          <Box>
            <Text fontWeight="bold" fontSize="lg">
              {props.author.name}
            </Text>
            <Text fontStyle="italic" color="gray.700">
              {props.author.job}
            </Text>
          </Box>
        </Flex>
        <Text fontSize="lg" mt="2">
          {props.text}
        </Text>
      </Box>
    </Box>
  );
};

export default Testimonial;
