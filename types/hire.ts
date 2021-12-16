import { CableServiceSchema, PromotionSchema, ServiceSchema } from "./";

export type Services = {
  internet: InternetService[];
  cable: {
    required: CableService[];
    optional: CableService[];
  };
};

export type InternetService = ServiceSchema;

export type CableService = ServiceSchema & CableServiceSchema;

export type Promotion = PromotionSchema & { Servicios: number[] };

export type UserFormValues = {
  firstName: string;
  lastName: string;
  dni: string;
  birthDate: string;
  address: string;
  phone: string;
  email: string;
};

export type ServicesFormValues = {
  internet: string;
  cable: {
    required: string;
    optional: string[];
  };
};

export type HireFormValues = {
  user: UserFormValues;
  services: ServicesFormValues;
};
