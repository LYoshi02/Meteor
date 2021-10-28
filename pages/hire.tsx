import { Box, Center } from "@chakra-ui/react";
import useSWR from "swr";

import HireForm from "../components/hire/hire-form";
import { Services, Deal } from "../types";

type FetchedData = {
  services: Services;
  deals: Deal[];
};

const fetcher = async (url: string) => {
  const result = await fetch(url);
  const services = await result.json();
  return services;
};

export default function HirePage() {
  const { data, error } = useSWR<FetchedData>("/api/service", fetcher);

  return (
    <Center height="full">
      <Box width="full">
        <HireForm services={data?.services} deals={data?.deals} />
      </Box>
    </Center>
  );
}
