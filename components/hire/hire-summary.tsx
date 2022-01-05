import { Box, Text } from "@chakra-ui/layout";

import ServicesTable from "./summary/services-table";
import {
  CableService,
  Promotion,
  InternetService,
  Services,
  ServicesFormValues,
} from "../../types";
import ActionButtons from "../ui/action-buttons";

type Props = {
  services: Services | undefined;
  selectedServices: ServicesFormValues | undefined;
  promotions: Promotion[] | undefined;
  isReqLoading: boolean;
  onSetPrevStep: () => void;
  onHireService: () => void;
};

type ServicesArr = (CableService | InternetService)[];

const getSelectedServicesDetails = (
  selectedServices: string[],
  allServices: Services
) => {
  const allServicesArr = joinServices(allServices);

  return allServicesArr.filter((service) =>
    selectedServices.includes(service.NroServicio.toString())
  );
};

const joinServices: (s: Services) => ServicesArr = (services) => {
  return [
    ...services.internet,
    ...services.cable.required,
    ...services.cable.optional,
  ];
};

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

const getPromotion = (
  promotions: Promotion[] | undefined,
  selectedServices: string[]
) => {
  if (!promotions) return;

  const sortedServices = selectedServices.sort();
  const result = promotions.find((promotion) => {
    const sortedPromotionServices = promotion.Servicios.sort();

    if (sortedPromotionServices.length !== sortedServices.length) return false;
    return sortedPromotionServices.every(
      (service, index) => service.toString() === sortedServices[index]
    );
  });

  return result;
};

const getSubtotal = (selectedServicesDetails: ServicesArr) => {
  return selectedServicesDetails.reduce(
    (prevValue, currentValue) => prevValue + +currentValue.Precio,
    0
  );
};

const HireSummary = (props: Props) => {
  let selectedServicesArr: string[] = [];
  let selectedServicesDetails: ServicesArr = [];

  if (props.selectedServices && props.services) {
    selectedServicesArr = joinSelectedServices(props.selectedServices);
    selectedServicesDetails = getSelectedServicesDetails(
      selectedServicesArr,
      props.services
    );
  }

  const subtotal = getSubtotal(selectedServicesDetails);

  let promotionDiscount = 0;
  const promotion = getPromotion(props.promotions, selectedServicesArr);
  if (promotion) {
    promotionDiscount = subtotal * (promotion.PorcentajeDto / 100);
  }

  const total = subtotal - promotionDiscount;

  return (
    <Box>
      <ServicesTable selectedServices={selectedServicesDetails} />
      <Text fontSize="lg" mt="2">
        Subtotal: {`$${subtotal.toFixed(2)}`}
      </Text>
      <Text fontSize="lg" mt="2">
        Descuento: {`$${promotionDiscount.toFixed(2)}`}
      </Text>
      <Text fontSize="lg" mt="2" fontWeight="bold">
        Total: {`$${total.toFixed(2)}`}
      </Text>
      <ActionButtons
        primaryBtn={{
          text: "Finalizar",
          action: props.onHireService,
          btnConfig: {
            isLoading: props.isReqLoading,
          },
        }}
        secondaryBtn={{
          text: "Anterior",
          action: props.onSetPrevStep,
          btnConfig: {
            isLoading: props.isReqLoading,
          },
        }}
      />
    </Box>
  );
};

export default HireSummary;
