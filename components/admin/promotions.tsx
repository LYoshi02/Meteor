import { Box, Button, Heading, useDisclosure } from "@chakra-ui/react";
import useSWR from "swr";

import Alert from "../ui/alert";
import LoadingSpinner from "../ui/loading-spinner";
import PromotionsTable from "./promotions/table";
import { PromotionSchema } from "../../types";
import useHttp from "../../hooks/useHttp";
import CreatePromotionModal from "./promotions/create-modal";

const Promotions = () => {
  const { data, error, mutate } = useSWR<{
    promotions: PromotionSchema[];
    promotionsCount: number;
  }>("/api/admin/promotions");
  const { sendRequest } = useHttp();
  const {
    isOpen: isModalOpen,
    onClose: onCloseModal,
    onOpen: onOpenModal,
  } = useDisclosure();

  const changePromotionStatus = async (promoNumber: number) => {
    await sendRequest<{ message: string; promotion: PromotionSchema }>(
      {
        input: `/api/admin/promotions/${promoNumber}`,
        init: {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ isFinished: true }),
        },
      },
      (res) => updatePromotion(res.promotion)
    );
  };

  const updatePromotion = (promotion: PromotionSchema) => {
    mutate((currentData) => {
      let updatedPromos = [...currentData!.promotions];
      const updatedPromotionIndex = updatedPromos.findIndex(
        (p) => p.NroPromocion === promotion.NroPromocion
      );

      updatedPromos[updatedPromotionIndex] = promotion;

      return {
        promotions: updatedPromos,
        promotionsCount: currentData!.promotionsCount,
      };
    });
  };

  let mainContent: JSX.Element;
  if (data) {
    mainContent = (
      <>
        <Button mb="2" onClick={onOpenModal} colorScheme="teal">
          Crear Promoción
        </Button>
        <PromotionsTable
          promotions={data.promotions}
          promotionsCount={data.promotionsCount}
          onChangeStatus={changePromotionStatus}
        />
      </>
    );
  } else if (error) {
    mainContent = (
      <Alert
        title="Error!"
        description="Se produjo un error, intente más tarde."
        status="error"
      />
    );
  } else {
    mainContent = <LoadingSpinner />;
  }

  return (
    <Box>
      <CreatePromotionModal isOpen={isModalOpen} onClose={onCloseModal} />
      <Heading as="h2">Promociones</Heading>
      <Box mt="4">{mainContent}</Box>
    </Box>
  );
};

export default Promotions;
