import useSWR from "swr";
import { NextSeo } from "next-seo";

import HireForm from "../components/hire/hire-form";
import MainLayout from "../components/layout/main-layout";
import FullScreenContainer from "../components/ui/full-screen-container";
import useUser from "../hooks/useUser";
import { Services, Promotions } from "../types";

type FetchedData = {
  services: Services;
  promotions: Promotions[];
};

export default function HirePage() {
  const { data } = useSWR<FetchedData>("/api/hire");
  const {} = useUser({ redirectTo: "/", redirectIfFound: true });

  return (
    <>
      <NextSeo
        title="Contratar Servicios"
        description="Contratá tus servicios de internet y cable en Meteor"
      />
      <MainLayout>
        <FullScreenContainer>
          <HireForm services={data?.services} promotions={data?.promotions} />
        </FullScreenContainer>
      </MainLayout>
    </>
  );
}
