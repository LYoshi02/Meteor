export { pool } from "./db";
export {
  getAllInternetServices,
  getAllPromotions,
  getContractNumberByInvoiceNumber,
  getLastContractByDni,
  getDetailsByInvoiceNumber,
  getHiredServices,
  getCustomerInvoiceById,
  getOptionalCableServices,
  getRequiredCableServices,
  getPromotionById,
  getPromotionBySelectedServices,
  getCustomerByDni,
  getUserByEmail,
  getUserByEmailAndPassword,
  getCustomerInvoices,
  getValidPromotionFromContract,
  getCurrentCustomerContract,
  getInvoices,
  getInvoicesCount,
  getContracts,
  getContractsCount,
  getContractById,
  getServices,
  getServicesCount,
  getCustomers,
  getCustomersCount,
  getPromotionsWithServices,
  getPromotionsCount,
  getServiceById,
} from "./selectQueries";

export {
  insertHiredServices,
  insertInvoice,
  insertInvoiceDetails,
  insertNewContract,
  insertNewUser,
  insertNewCustomer,
  insertNewService,
  insertCableService,
  insertInternetService,
  insertPromotion,
  insertServicesInPromotion,
} from "./insertQueries";

export {
  updateCustomerPartially,
  updateCustomer,
  updateUser,
  updateInvoiceStatus,
  updateContractStatus,
  updatePromotionStatus,
  updateService,
} from "./updateQueries";

export { deleteServiceById } from "./deleteQueries";
