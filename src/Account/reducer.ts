import type { Action, State } from "src/types";
import { createSelector } from "reselect";
import * as Immutable from "immutable";
import { getAccountState } from "src/config";
import { isAdministratorAccount, noError } from "../utility";

const initialState = Immutable.Map({
    error     : noError,
    fetched   : false,
    fetching  : false,
    info      : Immutable.Map(),
    companies : Immutable.Map(),
  }),

  fetchCurrentAccountPending = (state: any) => state.merge({
    error    : noError,
    fetching : true,
  }),
  fetchCurrentAccountRejected = (state: any, {
    payload: {
      error,
    },
  } : any) => state.merge({
    error,
    fetching: false,
  }),
  fetchCurrentAccountFulfilled = (state: any, {
    payload,
  } : { payload : { Account : any, Companies : any } }) => state.mergeDeep({
    fetched   : true,
    fetching  : false,
    info      : payload.Account,
    companies : payload.Companies,
  }),
  accountChangePassword = (state: any) => state.setIn(["info", "RequireChange"], false),
  accountGaveConsent = (state: any) => state.setIn(["info", "HasToGiveConsent"], false),

  reducer = (state: any = initialState, action: Action) => {
    switch (action.type) {
      case "FETCH_INITIAL_INFORMATION/pending":
        return fetchCurrentAccountPending(state);

      case "FETCH_INITIAL_INFORMATION/rejected":
        return fetchCurrentAccountRejected(state, action);

      case "FETCH_INITIAL_INFORMATION/fulfilled":
        return fetchCurrentAccountFulfilled(state, action);

      case "ACCOUNT_CHANGE_PASSWORD":
        return accountChangePassword(state);

      case "ACCOUNT_GAVE_CONSENT":
        return accountGaveConsent(state);

      default:
        return state;
    }
  },

  getFetched = (state: State) => getAccountState(state).get("fetched"),
  getError = (state: State) => getAccountState(state).get("error"),

  getCurrentAccount = (state: State) => getAccountState(state).get("info"),
  getCurrentAccountCompanies = (state: State) => getAccountState(state).get("companies"),
  getCurrentAccountIsFetching = (state: State) => getAccountState(state).get("fetching"),
  getCurrentAccountShouldFetch = createSelector(
    getCurrentAccountIsFetching,
    getFetched,
    getError,
    (isFetching, isFetched, error) => !isFetching && !isFetched && error === noError,
  ),
  getCurrentAccountIsFetched = createSelector(
    getCurrentAccountIsFetching,
    getFetched,
    getError,
    (isFetching, isFetched, error) => !isFetching && isFetched && error === noError,
  ),
  getCurrentAccountHasError = createSelector(
    getError, (error) => error !== noError,
  ),
  getIsCurrentAccountAdministrator = createSelector(
    getCurrentAccount,
    (account) => isAdministratorAccount(account.get("Type")),
  );

export const selectors = {
  getCurrentAccountCompanies,
  getCurrentAccount,
  getCurrentAccountIsFetching,
  getCurrentAccountShouldFetch,
  getCurrentAccountIsFetched,
  getCurrentAccountHasError,
  getIsCurrentAccountAdministrator,
};
export default reducer;
