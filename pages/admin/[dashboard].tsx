import { useRouter } from "next/router";

import DashboardLayout from "../../components/layout/dashboard-layout";
import Invoices from "../../components/admin/invoices";
import useUser from "../../hooks/useUser";
import Contracts from "../../components/admin/contracts";
import Services from "../../components/admin/services";
import Customers from "../../components/admin/customers";

export default function UserDashboardPage() {
  const router = useRouter();
  const {} = useUser({ redirectTo: "/", redirectIfFound: false });
  const dashboardRoute = router.query.dashboard;

  if (!dashboardRoute) return null;

  let dashboardElement: React.ReactElement;
  if (dashboardRoute === "invoices") {
    dashboardElement = <Invoices />;
  } else if (dashboardRoute === "contracts") {
    dashboardElement = <Contracts />;
  } else if (dashboardRoute === "services") {
    dashboardElement = <Services />;
  } else if (dashboardRoute === "customers") {
    dashboardElement = <Customers />;
  } else {
    router.push("/admin/invoices");
  }

  return <DashboardLayout>{dashboardElement!}</DashboardLayout>;
}
