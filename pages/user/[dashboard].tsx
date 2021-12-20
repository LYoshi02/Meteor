import { useRouter } from "next/router";

import DashboardLayout from "../../components/layout/dashboard-layout";
import Invoices from "../../components/user/invoices";
import UserConfig from "../../components/user/user-config";
import useUser from "../../hooks/useUser";

export default function InvoicesPage() {
  const router = useRouter();
  const {} = useUser({ redirectTo: "/" });
  const dashboardRoute = router.query.dashboard;

  if (!dashboardRoute) return null;

  let dashboardElement: React.ReactElement;
  if (dashboardRoute === "invoices") {
    dashboardElement = <Invoices />;
  } else if (dashboardRoute === "config") {
    dashboardElement = <UserConfig />;
  } else {
    router.replace("/user");
  }

  return <DashboardLayout>{dashboardElement!}</DashboardLayout>;
}
