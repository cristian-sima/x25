import type { Action } from "@types";
import { fetchCurrentCompany as fetchCurrentCompanyRequest } from "./request";

export const fetchCurrentCompany = (rawID: string): Action => ({
  type    : "FETCH_CURRENT_COMPANY_INFO",
  payload : fetchCurrentCompanyRequest(rawID),
});
