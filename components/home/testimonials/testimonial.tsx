import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

const Testimonial = () => {
  return (
    <Box mx="4">
      <Box
        bgColor="gray.100"
        textAlign="center"
        borderRadius="10"
        p="8"
        color="gray.900"
        position="relative"
        zIndex="10"
        _after={{
          display: "inline-block",
          width: "0px",
          height: "0px",
          content: '""',
          position: "absolute",
          bottom: "0",
          left: "50%",
          transform: "translate(-51%, 100%)",
          borderLeft: "10px solid transparent",
          borderRight: "10px solid transparent",
          borderTop: "17px solid #EDF2F7",
          zIndex: 0,
        }}
      >
        <Text fontWeight="bold" fontSize="xl">
          Un Título Interesante
        </Text>
        <Text fontSize="lg" mt="2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Velit id
          semper sit cursus quisque posuere risus ultricies tincidunt.
          Adipiscing dictum vulputate id ultricies. Ut at vel diam euismod morbi
          eget facilisis aliquet et. Non condimentum scelerisque sed purus et.
          Neque, neque quam augue egestas nunc consequat egestas in hendrerit.
          Tincidunt cursus.
        </Text>
      </Box>
      <Flex gridGap="2" justify="center" mt="8">
        <Avatar name="Ralph Edwards" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            Ralph Edwards
          </Text>
          <Text>CEO, ABC Corporation</Text>
        </Box>
      </Flex>
    </Box>
  );
};

export default Testimonial;
