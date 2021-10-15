import { Box, Center } from "@chakra-ui/react";
import useSWR from "swr";

import HireForm from "../components/hire/hire-form";
import { Services } from "../types";

type FetchedServices = {
  services: Services;
};

const fetcher = async (url: string) => {
  const result = await fetch(url);
  const services = await result.json();
  return services;
};

export default function HirePage() {
  const { data } = useSWR<FetchedServices>("/api/service", fetcher);

  return (
    <Center height="full">
      <Box width="full">
        <HireForm services={data?.services} />
      </Box>
    </Center>
  );
}
