import useSWR from "swr";

import HireForm from "../components/hire/hire-form";
import FullScreenContainer from "../components/ui/full-screen-container";
import { Services, Promotion } from "../types";

type FetchedData = {
  services: Services;
  promotions: Promotion[];
};

const fetcher = async (url: string) => {
  const result = await fetch(url);
  const services = await result.json();
  return services;
};

export default function HirePage() {
  const { data, error } = useSWR<FetchedData>("/api/hire", fetcher);

  return (
    <FullScreenContainer>
      <HireForm services={data?.services} promotions={data?.promotions} />
    </FullScreenContainer>
  );
}
