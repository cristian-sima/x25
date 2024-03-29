import { createSelector } from "reselect";
import * as Immutable from "immutable";
import { getAccountState } from "../config";
import { isAdministratorAccount, noError } from "../utility";
import type { Action, State } from "src/types";

type AccountModifyAction= {
  payload: Immutable.Map<string, any>
}

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
  fetchCurrentAccountRejected = (state: any) => state.merge({
    error    : "Error",
    fetching : false,
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
  accountModify = (state: any, { payload } : AccountModifyAction) => (
    state.update("info", (info : Immutable.Map<string, any>) => (
      info.mergeDeep(payload)
    ),
    )),
  accountGaveConsent = (state: any) => state.setIn(["info", "HasToGiveConsent"], false),

  reducer = (state: any = initialState, action: Action) => {
    switch (action.type) {
      case "account/FETCH_INITIAL_INFORMATION/pending":
        return fetchCurrentAccountPending(state);

      case "account/FETCH_INITIAL_INFORMATION/rejected":
        return fetchCurrentAccountRejected(state);

      case "account/FETCH_INITIAL_INFORMATION/fulfilled":
        return fetchCurrentAccountFulfilled(state, action);

      case "account/ACCOUNT_CHANGE_PASSWORD":
        return accountChangePassword(state);

      case "account/MODIFY_DATA":
        return accountModify(state, action);

      case "account/ACCOUNT_GAVE_CONSENT":
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
