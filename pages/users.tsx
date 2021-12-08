import { Heading, Box } from "@chakra-ui/react";

import UsersList from "../components/users/users-list";

export default function UsersPage() {
  // TODO: Implement user fetching later
  // const response = await fetch("http://localhost:3000/api/user", {
  //   method: "GET",
  // });
  // const fetchedUsers: { users: User[] } = await response.json();

  // const formattedUsers = fetchedUsers.users.map((user) => ({
  //   name: `${user.apellido} ${user.nombre}`,
  //   dni: user.dni,
  // }));

  return (
    <>
      <Heading as="h2" size="md">
        Usuarios
      </Heading>
      <Box bgColor="gray.700" mt="4">
        <UsersList users={[]} />
      </Box>
    </>
  );
}
