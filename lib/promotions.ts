import { getTopActivePromotions } from "../db";

export const getTopPromotions = async (amount: number) => {
  const promotions = await getTopActivePromotions(amount);

  return promotions;
};
