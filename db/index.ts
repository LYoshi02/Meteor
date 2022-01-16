export { pool } from "./db";
export {
  getAllInternetServices,
  getAllPromotions,
  getContractNumberByInvoiceNumber,
  getCurrentContractByDni,
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
} from "./updateQueries";
