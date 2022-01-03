import { Grid, GridItem } from "@chakra-ui/react";
import { UserContractDetails } from "../../types";

import Contract from "./contract-details/contract";
import HiredServices from "./contract-details/hired-services";
import Promotion from "./contract-details/promotion";

type Props = {
  details: UserContractDetails;
};

const ContractDetails = ({ details }: Props) => {
  return (
    <Grid templateColumns="repeat(8, 1fr)" mt="8" gap="4">
      <GridItem
        colSpan={3}
        bgGradient="linear(to-tl, purple.600, purple.800)"
        p="4"
        borderRadius="sm"
        shadow="sm"
      >
        <Contract contract={details.contract} />
      </GridItem>

      <GridItem
        colSpan={5}
        rowSpan={2}
        bgGradient="linear(to-tr, red.600, red.800)"
        p="4"
        borderRadius="sm"
        shadow="sm"
      >
        <HiredServices services={details.services} />
      </GridItem>

      {details.promotion && (
        <GridItem
          colSpan={3}
          bgGradient="linear(to-bl, cyan.600, cyan.800)"
          p="4"
          borderRadius="sm"
          shadow="sm"
        >
          <Promotion
            promotion={details.promotion}
            contractStartDate={details.contract.FechaInicio}
          />
        </GridItem>
      )}
    </Grid>
  );
};

export default ContractDetails;
