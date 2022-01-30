export type ServiceFormValues = {
  name: string;
  price: string;
  hidden: boolean;
  type: "TV" | "Internet";
  speed: number;
  optional: boolean;
};

export type PromotionFormValues = {
  duration: number;
  discount: number;
  services: number[];
};
