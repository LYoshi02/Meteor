import { useRouter } from "next/router";

import DashboardLayout from "../../components/layout/dashboard-layout";
import useUser from "../../hooks/useUser";

export default function UserDashboardPage() {
  const router = useRouter();
  const {} = useUser({ redirectTo: "/", redirectIfFound: false });
  const dashboardRoute = router.query.dashboard;

  if (!dashboardRoute) return null;

  //   let dashboardElement: React.ReactElement;

  return <DashboardLayout>{}</DashboardLayout>;
}
