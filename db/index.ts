export { query } from "./db";
export {
  getAllInternetServices,
  getAllPromotions,
  getContractByInvoiceNumber,
  getOptionalOrRequiredCableServices,
  getPromotionBySelectedServices,
  getUserByEmailAndPassword,
  getValidPromotionFromContract,
} from "./selectQueries";
export {
  insertHiredServices,
  insertInvoice,
  insertInvoiceDetails,
  insertNewContract,
  insertNewUser,
} from "./insertQueries";
