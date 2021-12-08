import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";

function HomePage() {
  return (
    <Container py="4" maxW="container.lg">
      <Box as="section">
        <Box>
          <Heading as="h2">Profesores</Heading>
          <SimpleGrid columns={2} spacing={10} mt="2">
            <Box p="4" bgColor="red.600" borderRadius="sm">
              <Text textAlign="center">Enrique Barreyro</Text>
            </Box>
            <Box p="4" bgColor="red.600" borderRadius="sm">
              <Text textAlign="center">Karina Eckert</Text>
            </Box>
          </SimpleGrid>
        </Box>

        <Box mt="8">
          <Heading as="h2">Alumnos</Heading>
          <SimpleGrid columns={3} spacing={10} mt="2">
            <Box p="4" bgColor="teal.600" borderRadius="sm">
              <Text textAlign="center">Facundo Franco</Text>
            </Box>
            <Box p="4" bgColor="teal.600" borderRadius="sm">
              <Text textAlign="center">Mariano Alvez</Text>
            </Box>
            <Box p="4" bgColor="teal.600" borderRadius="sm">
              <Text textAlign="center">Yoshi Debat</Text>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
