import { Box, Heading } from "@chakra-ui/react";
import useSWR from "swr";

import ContractDetails from "../../components/user/contract-details";
import useUser from "../../hooks/useUser";
import { UserContractDetails } from "../../types";

const Home = () => {
  const { user } = useUser({});
  const { data } = useSWR<UserContractDetails>("/api/user/contract-details");

  if (!data) {
    return null;
  }

  return (
    <Box>
      <Heading as="h2">
        Bienvenido, {user?.data?.firstName} {user?.data?.lastName}
      </Heading>
      <ContractDetails details={data} />
    </Box>
  );
};

export default Home;
