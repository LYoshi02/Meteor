import { Box, Heading } from "@chakra-ui/react";
import UserForm from "./user-config/user-form";

const UserConfig = () => {
  return (
    <Box>
      <Heading as="h2" mb="4">
        Tus Datos
      </Heading>
      <UserForm />
    </Box>
  );
};

export default UserConfig;
