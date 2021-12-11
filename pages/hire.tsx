import useSWR from "swr";

import HireForm from "../components/hire/hire-form";
import MainLayout from "../components/layout/main-layout";
import FullScreenContainer from "../components/ui/full-screen-container";
import useUser from "../hooks/useUser";
import { Services, Promotion } from "../types";

type FetchedData = {
  services: Services;
  promotions: Promotion[];
};

export default function HirePage() {
  const { data, error } = useSWR<FetchedData>("/api/hire");
  const {} = useUser({ redirectTo: "/", redirectIfFound: true });

  return (
    <MainLayout>
      <FullScreenContainer>
        <HireForm services={data?.services} promotions={data?.promotions} />
      </FullScreenContainer>
    </MainLayout>
  );
}
