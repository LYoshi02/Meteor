import { Grid, GridItem } from "@chakra-ui/react";

import Alert from "../../ui/alert";
import Contract from "./contract";
import HiredServices from "./hired-services";
import Promotion from "./promotion";
import { UserContractDetails } from "../../../types";
import { formateDateToFullDate } from "../../../utils/dateHelpers";

type Props = {
  details: UserContractDetails;
};

const ContractDetails = ({ details }: Props) => {
  if (details.contract.FechaFin) {
    return (
      <Alert
        status="info"
        title="Contrato Finalizado"
        description={`Tu contrato finalizó el ${formateDateToFullDate(
          details.contract.FechaFin
        )}`}
      />
    );
  }

  return (
    <Grid
      templateColumns={{ base: "1fr", lg: "repeat(8, 1fr)" }}
      templateRows={{
        base: "repeat(3, min-content)",
        lg: "repeat(auto-fill, min-content)",
      }}
      mt="8"
      gap="4"
    >
      <GridItem
        colSpan={{ base: 1, lg: 3 }}
        bgGradient="linear(to-tl, purple.600, purple.800)"
        p="4"
        borderRadius="sm"
        shadow="sm"
      >
        <Contract contract={details.contract} />
      </GridItem>

      <GridItem
        gridColumn={{ base: " 1 / -1", lg: "4 / -1" }}
        gridRow={{ lg: "1 / -1" }}
        bgGradient="linear(to-tr, red.600, red.800)"
        p="4"
        borderRadius="sm"
        shadow="sm"
      >
        <HiredServices services={details.services} />
      </GridItem>

      {details.promotion && (
        <GridItem
          colSpan={{ base: 1, lg: 3 }}
          gridRow={{ lg: "2 / -1" }}
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
