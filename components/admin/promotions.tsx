import { Box, Heading } from "@chakra-ui/react";
import useSWR from "swr";

import Alert from "../ui/alert";
import LoadingSpinner from "../ui/loading-spinner";
import PromotionsTable from "./promotions/table";
import { PromotionSchema } from "../../types";

const Promotions = () => {
  const { data, error } = useSWR<{
    promotions: PromotionSchema[];
    promotionsCount: number;
  }>("/api/admin/promotions");

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <PromotionsTable
        promotions={data.promotions}
        promotionsCount={data.promotionsCount}
      />
    );
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
      <Heading as="h2">Promociones</Heading>
      <Box mt="4">{mainContent}</Box>
    </Box>
  );
};

export default Promotions;
