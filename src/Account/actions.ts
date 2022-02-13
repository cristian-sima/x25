import type { Action } from "types";
import { fetchInitialInformation as fetchInitialInformationRequest } from "./request";

export const fetchInitialInformation = (appName: string): Action => ({
  type    : "FETCH_INITIAL_INFORMATION",
  payload : fetchInitialInformationRequest(appName),
});
