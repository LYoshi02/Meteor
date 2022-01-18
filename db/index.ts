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
} from "./selectQueries";
export {
  insertHiredServices,
  insertInvoice,
  insertInvoiceDetails,
  insertNewContract,
  insertNewUser,
  insertNewCustomer,
} from "./insertQueries";
export {
  updateCustomer,
  updateUser,
  updateInvoiceStatus,
  updateContractStatus,
} from "./updateQueries";
