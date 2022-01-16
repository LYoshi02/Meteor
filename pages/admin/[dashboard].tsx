import { useRouter } from "next/router";

import DashboardLayout from "../../components/layout/dashboard-layout";
import Invoices from "../../components/admin/invoices";
import useUser from "../../hooks/useUser";

export default function UserDashboardPage() {
  const router = useRouter();
  const {} = useUser({ redirectTo: "/", redirectIfFound: false });
  const dashboardRoute = router.query.dashboard;

  if (!dashboardRoute) return null;

  let dashboardElement: React.ReactElement;
  if (dashboardRoute === "invoices") {
    dashboardElement = <Invoices />;
  } else {
    router.push("/admin/invoices");
  }

  return <DashboardLayout>{dashboardElement!}</DashboardLayout>;
}
