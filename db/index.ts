export { query } from "./db";
export {
  getAllInternetServices,
  getAllPromotions,
  getContractByInvoiceNumber,
  getDetailsByInvoiceNumber,
  getInvoiceById,
  getOptionalOrRequiredCableServices,
  getPromotionBySelectedServices,
  getUserByDni,
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
