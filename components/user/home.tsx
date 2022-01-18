import { Box, Heading } from "@chakra-ui/react";
import id from "date-fns/esm/locale/id/index.js";
import useSWR from "swr";

import ContractDetails from "../../components/user/contract-details";
import useUser from "../../hooks/useUser";
import { UserContractDetails } from "../../types";
import Alert from "../ui/alert";
import LoadingSpinner from "../ui/loading-spinner";

const Home = () => {
  const { user } = useUser({});
  const { data, error } = useSWR<UserContractDetails>(
    "/api/user/contract-details"
  );

  let mainContent: JSX.Element;
  if (data) {
    mainContent = <ContractDetails details={data} />;
  } else if (error) {
    mainContent = (
      <Alert
        title="Error!"
        description="Se produjo un error, intente más tarde."
        status="error"
      />
    );
  } else {
    mainContent = <LoadingSpinner />;
  }

  return (
    <Box>
      <Heading as="h2" width={{ base: "80%", md: "100%" }}>
        Bienvenido, {user?.data?.firstName} {user?.data?.lastName}
      </Heading>
      <Box mt="8">{mainContent}</Box>
    </Box>
  );
};

export default Home;
