export type {
  Services,
  InternetService,
  CableService,
  Promotions,
  UserFormValues,
  HireFormValues,
  ServicesFormValues,
} from "./hire";

export type { AuthUser, UserData } from "./auth";

export type {
  CableServiceSchema,
  ClientSchema,
  ContractSchema,
  InternetServiceSchema,
  InvoiceSchema,
  InvoiceDetailSchema,
  ServiceSchema,
  UserSchema,
  PromotionSchema,
  RoleSchema,
} from "./dbSchemas";

export type {
  UserConfigData,
  UserConfigFormValues,
  UserConfigPassword,
  UserContractDetails,
} from "./user";

export type { ServiceFormValues, PromotionFormValues } from "./admin";

export {
  AuthenticationError,
  GenericError,
  ValidationError,
  NotFoundError,
} from "./error";

export type { ErrorTypes } from "./error";
