import { Box, Text } from "@chakra-ui/layout";

import ServicesTable from "./summary/services-table";
import {
  CableService,
  InternetService,
  Promotions,
  Services,
  ServicesFormValues,
} from "../../../types";
import ActionButtons from "../../ui/action-buttons";
import {
  getPromotion,
  getSelectedServicesDetails,
  getSubtotal,
  joinSelectedServices,
} from "./summary/helpers";

type Props = {
  services: Services | undefined;
  selectedServices: ServicesFormValues | undefined;
  promotions: Promotions[] | undefined;
  isReqLoading: boolean;
  onSetPrevStep: () => void;
  onFinish: () => void;
};

const HireSummary = (props: Props) => {
  let selectedServicesArr: string[] = [];
  let selectedServicesDetails: (CableService | InternetService)[] = [];

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
          action: props.onFinish,
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
