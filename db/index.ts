export { query } from "./db";
export {
  getAllInternetServices,
  getAllPromotions,
  getContractNumberByInvoiceNumber,
  getCurrentContractByDni,
  getDetailsByInvoiceNumber,
  getHiredServices,
  getUserInvoiceById,
  getOptionalOrRequiredCableServices,
  getPromotionById,
  getPromotionBySelectedServices,
  getUserByDni,
  getUserByDniOrEmail,
  getUserByEmailAndPassword,
  getUserInvoices,
  getValidPromotionFromContract,
} from "./selectQueries";
export {
  insertHiredServices,
  insertInvoice,
  insertInvoiceDetails,
  insertNewContract,
  insertNewUser,
} from "./insertQueries";
export { updateUser } from "./updateQueries";
