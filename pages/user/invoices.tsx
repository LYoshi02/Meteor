import { Heading } from "@chakra-ui/react";

import DashboardLayout from "../../components/layout/dashboard-layout";
import Invoices from "../../components/user/invoices";

export default function InvoicesPage() {
  return (
    <DashboardLayout>
      <Heading as="h2">Mis Facturas</Heading>
      <Invoices />
    </DashboardLayout>
  );
}
