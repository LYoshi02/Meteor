import { Switch, Td, Text, Tr } from "@chakra-ui/react";

import { PromotionSchema } from "../../../types";

type Props = {
  promotions: (PromotionSchema & { Servicios: string[] })[];
  onChange: (promotionNumber: number) => void;
};

const PromotionsTableRows = (props: Props) => {
  return (
    <>
      {props.promotions.map((promo) => (
        <Tr key={promo.NroPromocion}>
          <Td textAlign="center">{promo.NroPromocion}</Td>
          <Td textAlign="center">{promo.Nombre}</Td>
          <Td textAlign="center">{promo.PorcentajeDto} %</Td>
          <Td textAlign="center">{promo.Duracion} Meses</Td>
          <Td textAlign="center">
            {promo.Servicios.map((service, index) => (
              <Text key={service}>
                {index + 1}. {service}
              </Text>
            ))}
          </Td>
          <Td textAlign="center">
            <Switch
              isChecked={promo.Finalizado}
              isDisabled={promo.Finalizado}
              onChange={() => props.onChange(promo.NroPromocion)}
            />
          </Td>
        </Tr>
      ))}
    </>
  );
};

export default PromotionsTableRows;
