import { Grid, GridItem } from "@chakra-ui/react";
import useSWR from "swr";

import { PromotionSchema, ServiceSchema } from "../../types";
import Contract from "./contract-details/contract";
import HiredServices from "./contract-details/hired-services";
import Promotion from "./contract-details/promotion";

const ContractDetails = () => {
  const { data } = useSWR<{
    contract: { NroContrato: number; FechaInicio: string };
    services: ServiceSchema[];
    promotion: PromotionSchema | null;
  }>("/api/user/contract-details");

  if (!data) {
    return null;
  }

  return (
    <Grid templateColumns="repeat(8, 1fr)" mt="8" gap="4">
      <GridItem
        colSpan={3}
        bgGradient="linear(to-tl, purple.600, purple.800)"
        p="4"
        borderRadius="sm"
        shadow="sm"
      >
        <Contract contract={data.contract} />
      </GridItem>

      <GridItem
        colSpan={5}
        rowSpan={2}
        bgGradient="linear(to-tr, red.600, red.800)"
        p="4"
        borderRadius="sm"
        shadow="sm"
      >
        <HiredServices services={data.services} />
      </GridItem>

      {data.promotion && (
        <GridItem
          colSpan={3}
          bgGradient="linear(to-bl, cyan.600, cyan.800)"
          p="4"
          borderRadius="sm"
          shadow="sm"
        >
          <Promotion
            promotion={data.promotion}
            contractStartDate={data.contract.FechaInicio}
          />
        </GridItem>
      )}
    </Grid>
  );
};

export default ContractDetails;
