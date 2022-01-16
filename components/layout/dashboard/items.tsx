import { Stack } from "@chakra-ui/react";

import {
  CashIcon,
  DocumentTextIcon,
  GlobeIcon,
  HomeIcon,
  TagIcon,
  UserIcon,
} from "../../../assets/icons/index";
import useUser from "../../../hooks/useUser";
import ListItem from "./list-item";

type Item = {
  name: string;
  path: string;
  icon: JSX.Element;
};

const userDashboardItems: Item[] = [
  { name: "Inicio", path: "/user/home", icon: <HomeIcon /> },
  { name: "Facturas", path: "/user/invoices", icon: <DocumentTextIcon /> },
  { name: "Usuario", path: "/user/config", icon: <UserIcon /> },
];

const adminDashboardItems: Item[] = [
  { name: "Contratos", path: "/admin/contracts", icon: <CashIcon /> },
  { name: "Facturas", path: "/admin/invoices", icon: <DocumentTextIcon /> },
  {
    name: "Promociones",
    path: "/admin/promotions",
    icon: <TagIcon />,
  },
  { name: "Servicios", path: "/admin/services", icon: <GlobeIcon /> },
  { name: "Usuarios", path: "/admin/users", icon: <UserIcon /> },
];

type Props = {
  onCloseDrawer?: () => void;
};

const UserDashboardItems = (props: Props) => {
  const { user } = useUser({});

  if (!user) return null;

  let dashboardItems: Item[];
  if (user?.isAdmin) {
    dashboardItems = adminDashboardItems;
  } else {
    dashboardItems = userDashboardItems;
  }

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
