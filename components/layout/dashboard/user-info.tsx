import { Avatar, Flex, Text } from "@chakra-ui/react";

import useUser from "../../../hooks/useUser";

const UserInfo = () => {
  const { user } = useUser({});

  let userFullName = "";
  if (user?.data) {
    userFullName = `${user.data.firstName} ${user.data.lastName}`;
  } else if (user?.isAdmin) {
    userFullName = "ADMIN";
  }

  return (
    <Flex width="full" align="center" gridGap="2">
      <Avatar name={userFullName} />
      <Text>{userFullName}</Text>
    </Flex>
  );
};

export default UserInfo;
