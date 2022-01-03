import { Box } from "@chakra-ui/react";

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

const UserDashboardItems = () => {
  return (
    <Box as="ul" listStyleType="none">
      {dashboardItems.map((item) => (
        <ListItem
          key={item.path}
          name={item.name}
          path={item.path}
          icon={item.icon}
        />
      ))}
    </Box>
  );
};

export default UserDashboardItems;
