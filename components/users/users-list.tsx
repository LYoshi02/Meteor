import { Divider, UnorderedList } from "@chakra-ui/layout";

import UserItem from "./user-item";

type Props = {
  users: {
    name: string;
    dni: string;
  }[];
};

const UsersList = (props: Props) => {
  return (
    <UnorderedList listStyleType="none" m="0" borderRadius="sm">
      {props.users.map((user) => (
        <UserItem key={user.dni} name={user.name} dni={user.dni} />
      ))}
    </UnorderedList>
  );
};

export default UsersList;
