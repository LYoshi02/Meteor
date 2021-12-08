import { Box, Text } from "@chakra-ui/layout";

import ServicesTable from "./summary/services-table";
import {
  CableService,
  Deal,
  InternetService,
  Services,
  ServicesFormValues,
} from "../../types";
import ActionButtons from "../ui/action-buttons";

type Props = {
  services: Services | undefined;
  selectedServices: ServicesFormValues | undefined;
  onSetPrevStep: () => void;
  deals: Deal[] | undefined;
  onHireService: () => void;
};

type ServicesArr = (CableService | InternetService)[];

const joinSelectedServices = (selectedServices: ServicesFormValues) => {
  const filteredOptionalCableServices = selectedServices.cable.optional.filter(
    (s) => s
  );
  const services = [
    selectedServices.internet,
    selectedServices.cable.required,
    ...filteredOptionalCableServices,
  ];

  return services;
};

const joinServices: (s: Services) => ServicesArr = (services) => {
  return [...services.internet, ...services.cable];
};

const getDeal = (deals: Deal[], selectedServices: string[]) => {
  const sortedServices = selectedServices.sort();
  const result = deals.find((deal) => {
    const sortedDealServices = deal.Servicios.sort();

    if (sortedDealServices.length !== sortedServices.length) return false;
    return sortedDealServices.every(
      (service, index) => service.toString() === sortedServices[index]
    );
  });

  return result;
};

const HireSummary = (props: Props) => {
  let allServices: ServicesArr = [];
  let selectedServicesDetails: ServicesArr = [];
  let selectedServices: string[] = [];

  if (props.selectedServices) {
    selectedServices = joinSelectedServices(props.selectedServices);
  }

  if (props.services) {
    allServices = joinServices(props.services);
  }

  selectedServicesDetails = allServices.filter((service) =>
    selectedServices.includes(service.NroServicio.toString())
  );

  const subtotal = selectedServicesDetails.reduce(
    (prevValue, currentValue) => prevValue + +currentValue.Precio,
    0
  );

  let discount = 0;
  if (props.deals) {
    const deal = getDeal(props.deals, selectedServices);
    if (deal) {
      discount = subtotal * (deal.PorcentajeDto / 100);
    }
  }

  const total = subtotal - discount;

  return (
    <Box>
      <ServicesTable selectedServices={selectedServicesDetails} />
      <Text fontSize="lg" mt="2">
        Subtotal: {`$${subtotal.toFixed(2)}`}
      </Text>
      <Text fontSize="lg" mt="2">
        Descuento: {`$${discount.toFixed(2)}`}
      </Text>
      <Text fontSize="lg" mt="2" fontWeight="bold">
        Total: {`$${total.toFixed(2)}`}
      </Text>
      <ActionButtons
        primaryBtn={{ text: "Finalizar", action: props.onHireService }}
        secondaryBtn={{ text: "Anterior", action: props.onSetPrevStep }}
      />
    </Box>
  );
};

export default HireSummary;
