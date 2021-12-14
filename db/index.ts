export { query } from "./db";
export {
  getAllInternetServices,
  getAllPromotions,
  getOptionalOrRequiredCableServices,
  getPromotionBySelectedServices,
  getUserByEmailAndPassword,
} from "./selectQueries";
export {
  insertHiredServices,
  insertInvoice,
  insertInvoiceDetails,
  insertNewContract,
  insertNewUser,
} from "./insertQueries";
