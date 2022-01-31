import { Box, Flex, Heading } from "@chakra-ui/react";

import Container from "../ui/container";
import Promotion from "./promotions/promotion";
import { PromotionSchema } from "../../types";

type Props = {
  promotions: (PromotionSchema & {
    Servicios: string[];
    PrecioAnterior: string;
    PrecioFinal: string;
  })[];
};

const Promotions = (props: Props) => {
  let promotionsArr = [...props.promotions];
  const mostPopularPromotion = promotionsArr.shift();

  if (mostPopularPromotion) {
    promotionsArr.splice(1, 0, mostPopularPromotion);
  }

  return (
    <Box as="section" bgColor="#0B0D17" py="48">
      <Container>
        <Box textAlign="center" gridColumn="1 / -1">
          <Heading as="h2" fontSize={{ base: "4xl", md: "5xl" }}>
            Nuestras Promociones
          </Heading>
        </Box>
        <Flex
          mt="24"
          gridColumn={{ base: "1 / -1", md: "2 / 12", lg: "1 / -1" }}
          gridGap={{ base: "24", lg: "12" }}
          flexDirection={{ base: "column", lg: "row" }}
        >
          {promotionsArr.map((promo, index) => (
            <Promotion
              key={promo.NroPromocion}
              number={promo.NroPromocion}
              name={promo.Nombre}
              duration={promo.Duracion}
              discount={promo.PorcentajeDto}
              services={promo.Servicios}
              previousPrice={promo.PrecioAnterior}
              finalPrice={promo.PrecioFinal}
              mostPopular={index === 1}
            />
          ))}
        </Flex>
      </Container>
    </Box>
  );
};

export default Promotions;
