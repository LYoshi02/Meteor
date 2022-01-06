import { Stack } from "@chakra-ui/react";

import {
  HomeIcon,
  DocumentTextIcon,
  UserIcon,
} from "../../../assets/icons/index";
import ListItem from "./list-item";

const dashboardItems = [
  { name: "Inicio", path: "/user/home", icon: <HomeIcon /> },
  { name: "Facturas", path: "/user/invoices", icon: <DocumentTextIcon /> },
  { name: "Usuario", path: "/user/config", icon: <UserIcon /> },
];

type Props = {
  onCloseDrawer?: () => void;
};

const UserDashboardItems = (props: Props) => {
  return (
    <Stack as="ul" listStyleType="none" spacing="2">
      {dashboardItems.map((item) => (
        <ListItem
          key={item.path}
          name={item.name}
          path={item.path}
          icon={item.icon}
          clicked={props.onCloseDrawer}
        />
      ))}
    </Stack>
  );
};

export default UserDashboardItems;
