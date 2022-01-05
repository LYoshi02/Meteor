import { useRouter } from "next/router";

import DashboardLayout from "../../components/layout/dashboard-layout";
import Home from "../../components/user/home";
import Invoices from "../../components/user/invoices";
import UserConfig from "../../components/user/user-config";
import useUser from "../../hooks/useUser";

export default function UserDashboardPage() {
  const router = useRouter();
  const {} = useUser({ redirectTo: "/", redirectIfFound: false });
  const dashboardRoute = router.query.dashboard;

  if (!dashboardRoute) return null;

  let dashboardElement: React.ReactElement;
  if (dashboardRoute === "home") {
    dashboardElement = <Home />;
  } else if (dashboardRoute === "invoices") {
    dashboardElement = <Invoices />;
  } else if (dashboardRoute === "config") {
    dashboardElement = <UserConfig />;
  } else {
    router.replace("/user/home");
  }

  return <DashboardLayout>{dashboardElement!}</DashboardLayout>;
}
