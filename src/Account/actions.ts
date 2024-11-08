import { createAsyncThunk } from "@reduxjs/toolkit";
import * as Immutable from "immutable";
import agent from "superagent";
import { normalize } from "../";
import { noError } from "../utility";

const
  { normalizeArrayByField, normalizeArray } = normalize,
  normalizeInitialInformation = (info: any) => {
    const { Account, IsConnected, Counties, Companies } = info;

    return {
      Account  : Immutable.fromJS(Account || {}),
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

export const
  fetchInitialInformation = createAsyncThunk("account/FETCH_INITIAL_INFORMATION",
    async (app : string) => {
      const response = await agent.
        get("/api/extern/get-initial-information").
        type("form").
        query({
          app,
        });

      return normalizeInitialInformation(response?.body || {});
    },
  ),
  modifyCurrentAccountData = (newAccountDataToMerge : Immutable.Map<string, any>) => ({
    type    : "account/MODIFY_DATA",
    payload : newAccountDataToMerge,
  });
