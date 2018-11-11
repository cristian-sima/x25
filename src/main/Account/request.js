// @flow

import agent from "superagent";
import * as Immutable from "immutable";

import { noError, normalizeArrayByField, withPromiseCallback } from "../../utility";

const normalizeInitialInformation = (info : any) => {

  const
    { Account, IsConnected, Counties } = info;

  return {
    Account  : Immutable.Map(Account || {}),
    IsConnected,
    Error    : IsConnected ? noError : "Not connected",
    Counties : (typeof Counties === "undefined") ? [] : (
      normalizeArrayByField(Counties, "Short").entities
    ),
  };
};

export const fetchInitialInformation = () => (
  new Promise((resolve, reject) => (
    agent.
      get("/api/extern/get-initial-information").
      set("Accept", "application/json").
      end(withPromiseCallback((reponse) => resolve(normalizeInitialInformation(reponse)), reject))
  )) : Promise<any>
);
