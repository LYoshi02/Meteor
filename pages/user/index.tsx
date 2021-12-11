import DashboardLayout from "../../components/layout/dashboard-layout";
import useUser from "../../hooks/useUser";

export default function UserPage() {
  const { user } = useUser({ redirectTo: "/" });

  return <DashboardLayout></DashboardLayout>;
}
