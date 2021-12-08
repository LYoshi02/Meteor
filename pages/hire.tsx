import { Box, Center, Container } from "@chakra-ui/react";
import useSWR from "swr";

import HireForm from "../components/hire/hire-form";
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
    <Container py="4" flex="1">
      <Center height="full">
        <Box width="full">
          <HireForm services={data?.services} promotions={data?.promotions} />
        </Box>
      </Center>
    </Container>
  );
}
