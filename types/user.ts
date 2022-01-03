import { PromotionSchema, ServiceSchema } from ".";

export type UserConfigFormValues = UserConfigData & UserConfigPassword;

export type UserConfigData = {
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  email: string;
};

export type UserConfigPassword = {
  currentPassword: string;
  newPassword: string;
};

export type UserContractDetails = {
  contract: { NroContrato: number; FechaInicio: string };
  services: ServiceSchema[];
  promotion: PromotionSchema | null;
};
