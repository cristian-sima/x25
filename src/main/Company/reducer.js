// @flow
/* eslint-disable global-require */

import * as Immutable from "immutable";

import type { Action, State } from "Auto/types";

import { createSelector } from "reselect";

import { noError } from "x25/lib/utility";

type CurrentState = any;

const initialState : CurrentState = Immutable.Map({
  error    : noError,
  fetched  : false,
  fetching : false,

  company: Immutable.Map(),
});

const
  fetchCompanyPending = () => (
    initialState.set("fetching", true)
  ),
  fetchCompanyRejected = (state : any, { payload : { error } }) => (
    state.merge({
      error,
      fetching: false,
    })
  ),
  fetchCompanyFulfilled = (state : any, { payload }) => (
    state.mergeDeep({
      fetched  : true,
      fetching : false,
      company  : payload,
    })
  ),
  modifyCompany = (state : any, { payload }) => (
    state.set("company", payload)
  ),
  clearInfoIfCurrentCompany = (state : any, { payload }) => {
    const
      companyID = String(state.getIn([
        "company",
        "ID",
      ])),
      fetched = state.get("fetched"),
      dataID = String(payload.get("ID")),
      theCurrentCompanyHasChanged = fetched && (dataID === companyID);

    if (theCurrentCompanyHasChanged) {
      return state.clear();
    }

    return state;
  };

const reducer = (state : any = initialState, action : Action) => {
  switch (action.type) {
    case "FETCH_CURRENT_COMPANY_INFO_PENDING":
      return fetchCompanyPending();

    case "FETCH_CURRENT_COMPANY_INFO_REJECTED":
      return fetchCompanyRejected(state, action);

    case "FETCH_CURRENT_COMPANY_INFO_FULFILLED":
      return fetchCompanyFulfilled(state, action);

    case "MODIFY_CURRENT_COMPANY_INFO":
      return modifyCompany(state, action);

    case "TOGGLE_COMPANY_STATE":
    case "DELETE_COMPANY":
      return clearInfoIfCurrentCompany(state, action);

    default:
      return state;
  }
};

const
  getFetching = (state : State) => state.getIn([
    "companyInfo",
    "fetching",
  ]) || false,
  getFetched = (state : State) => state.getIn([
    "companyInfo",
    "fetched",
  ]) || false,
  getError = (state : State) => state.getIn([
    "companyInfo",
    "error",
  ]) || noError,
  getCurrentAccountFetched = (state : State) => state.getIn([
    "account",
    "fetched",
  ]) || false;

const checkForNoErrors = (error) => error !== noError;

const
  getCurrentCompany = (state : State) : any => (
    state.getIn([
      "companyInfo",
      "company",
    ]) || Immutable.Map()
  ),
  getCurrentCompanyIsFetched = createSelector(
    getFetching,
    getFetched,
    getError,
    (isFetching, isFetched, error) => (
      !isFetching && isFetched && error === noError
    )
  ),
  getCurrentCompanyIsFetching = createSelector(
    getFetching,
    getError,
    (isFetching, error) => (
      isFetching && error === noError
    )
  ),
  getCurrentCompanyHasError = createSelector(
    getError,
    checkForNoErrors,
  ),
  getCurrentCompanyID = (state : any) => {
    const getState = () => {
      if (typeof state === "undefined") {
        const store = require("Auto/store/store").default;

        return store.getState();
      }

      return state;
    };

    return getState().getIn([
      "companyInfo",
      "company",
      "ID",
    ]);
  },
  getCurrentCompanyShouldFetch = createSelector(
    getCurrentAccountFetched,
    getCurrentCompanyIsFetched,
    getCurrentCompanyHasError,
    getFetching,
    getCurrentCompany,
    (accountFetched, isFetched, hasError, isFetching, company) => (rawID : string) => {
      const
        hasIDChanged = () => {
          const
            id = company.get("ID"),
            newID = Number(rawID);

          return (
            id === 0 ||
          id !== newID ||
          (id === newID && !isFetched)
          );
        };

      return (
        accountFetched && !hasError && !isFetching && hasIDChanged()
      );
    }
  ),
  getCompanyModules = createSelector(
    getCurrentCompany,
    (company) => company.get("Modules") || ""
  );

export const selectors = {
  getCurrentCompany,
  getCurrentCompanyIsFetched,
  getCurrentCompanyIsFetching,
  getCurrentCompanyHasError,
  getCurrentCompanyID,
  getCurrentCompanyShouldFetch,
  getCompanyModules,
};

export default reducer;
