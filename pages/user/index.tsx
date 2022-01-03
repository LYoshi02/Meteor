import { Heading } from "@chakra-ui/react";

import DashboardLayout from "../../components/layout/dashboard-layout";
import ContractDetails from "../../components/user/contract-details";
import useUser from "../../hooks/useUser";

const UserPage = () => {
  const { user } = useUser({ redirectTo: "/" });

  return (
    <DashboardLayout>
      <Heading as="h2">
        Bienvenido, {user?.data?.firstName} {user?.data?.lastName}
      </Heading>
      <ContractDetails />
    </DashboardLayout>
  );
};

export default UserPage;
