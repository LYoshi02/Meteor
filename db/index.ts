export { query } from "./db";
export {
  getAllInternetServices,
  getAllPromotions,
  getContractNumberByInvoiceNumber,
  getDetailsByInvoiceNumber,
  getUserInvoiceById,
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
export { updateUser } from "./updateQueries";
