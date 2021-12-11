import useSWR from "swr";

import HireForm from "../components/hire/hire-form";
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
    <FullScreenContainer>
      <HireForm services={data?.services} promotions={data?.promotions} />
    </FullScreenContainer>
  );
}
