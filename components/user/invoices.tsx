import { Box, Heading } from "@chakra-ui/react";
import useSWR from "swr";

import { InvoiceSchema } from "../../types";
import Alert from "../ui/alert";
import LoadingSpinner from "../ui/loading-spinner";
import InvoicesTable from "./invoices/table";

const Invoices = () => {
  const { data, error } =
    useSWR<{ invoices: InvoiceSchema[]; invoicesCount: number }>(
      "/api/user/invoices"
    );

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <InvoicesTable
        invoices={data.invoices}
        invoicesCount={data.invoicesCount}
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
      <Heading as="h2">Mis Facturas</Heading>
      <Box height="full" maxWidth="full" overflow="auto" mt="4">
        {mainContent}
      </Box>
    </Box>
  );
};

export default Invoices;
