import type { Action } from "src/types";

import agent from "superagent";
import * as Immutable from "immutable";
import { noError, normalizeArrayByField, normalizeArray, withPromiseCallback } from "../utility";

const normalizeInitialInformation = (info: any) => {
  const {
    Account,
    IsConnected,
    Counties,
    Companies,
  } = info;

  return {
    Account  : Immutable.Map(Account || {}),
    IsConnected,
    Error    : IsConnected ? noError : "Not connected",
    Counties : (
      typeof Counties === "undefined"
        ? Immutable.List()
        : normalizeArrayByField(Counties, "Short").entities
    ),
    Companies: (
      typeof Companies === "undefined"
        ? Immutable.List()
        : normalizeArray(Companies).entities
    ),
  };
};

export const fetchInitialInformation = (app: string): Action => ({
  type    : "FETCH_INITIAL_INFORMATION",
  payload : async () => {
    const response = await agent.
      get("/api/extern/get-initial-information").
      type("form").
      query({
        app,
      });

    return normalizeInitialInformation(response);
  },
});
