/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
import Immutable from "immutable";
import { createSelector } from "reselect";
import { noError } from "../utility";
import createLoadGenericData, { CreateGenericOptions } from "./LoaderRender";

type State = Immutable.Map<string, any>;

type Options = {
  location?: string;
}

const
  findLocation = (payload : { Data : any, location? : string}) => {
    const { location, Data } = payload;

    return (Immutable.
      List(["data"]).
      merge(Immutable.List(location ? String(location).split(",") : [])).
      push(String(Data.get("ID"))).
      toJS());
  },
  initialStatusState = Immutable.Map({
    errorMessage : noError,
    fetched      : false,
    fetching     : false,
  }),
  statusReducer = "status",
  initialState = Immutable.Map({
    [statusReducer] : Immutable.Map(),
    data            : Immutable.Map(),
  }),
  pending = (state: State, { meta : { arg } } : any) => (
    state.mergeIn([statusReducer, arg], initialStatusState.set("fetching", true))
  ),
  rejected = (state: State, { meta : { arg } } : any) => (
    state.mergeDeepIn([statusReducer, arg], Immutable.Map({
      errorMessage : "Error",
      fetching     : false,
    }))
  ),
  setItem = (state: State, { payload } : any) => (
    state.setIn(findLocation(payload), payload.Data)
  ),
  deleteItemReducer = (state: State, { payload } : any) => state.deleteIn(
    state.deleteIn(findLocation(payload)),
  ),
  clearToken = (state : State, { payload : { token } } : { payload : { token : string }}) => (
    state.mergeDeepIn([statusReducer, token], initialStatusState)
  ),
  fulfilled = (state : State, { meta, payload } : any) => (state.
    setIn([statusReducer, meta.arg], (Immutable.Map({
      fetched        : true,
      fetching       : false,
      error          : noError,
      hasBeenFetched : true,
    }))).
    mergeDeepIn(["data"], payload));

export const
  createLoader = ({ key, url, normalizeResult } : CreateGenericOptions) => {
    const reducer = (state: State = initialState, action: any) => {
        switch (action.type) {
          case `${key}/pending`:
            return pending(state, action);

          case `${key}/rejected`:
            return rejected(state, action);

          case `${key}/fulfilled`:
            return fulfilled(state, action);

          case `${key}/clear-all`:
            return initialState;

          case `${key}/clear-token`:
            return clearToken(state, action);

          case `${key}/add`:
          case `${key}/modify`:
            return setItem(state, action);

          case `${key}/delete`:
            return deleteItemReducer(state, action);

          default:
            return state;
        }
      },
      addItem = (payload: any, options : Options) => ({
        type    : `${key}/add`,
        payload : {
          ...options,
          Data: payload,
        },
      }),
      modifyItem = (payload: any, options : Options) => ({
        type    : `${key}/modify`,
        payload : {
          ...options,
          Data: payload,
        },
      }),
      deleteItem = (payload: any, options : Options) => ({
        type    : `${key}/delete`,
        payload : {
          ...options,
          Data: payload,
        },
      }),
      clearAllAction = () => ({
        type: `${key}/clear-all`,
      }),
      clearTokenAction = (token: string) => ({
        type    : `${key}/clear-token`,
        payload : {
          token,
        },
      }),
      isFetching = (state: State, token : string) => (state.getIn([key, statusReducer, token, "fetching"]) || false) as boolean,
      hasBeenFetched = (state: State, token : string) => (state.getIn([key, statusReducer, token, "hasBeenFetched"]) || false) as boolean,
      getFetchedSelector = (state: State, token : string) => (state.getIn([key, statusReducer, token, "fetched"]) || false)as boolean,
      getError = (state: State, token : string) => (
        (state.getIn([key, statusReducer, token, "errorMessage"]) || noError) as string
      ),
      getData = (state: State) => (
        (state.getIn([key, "data"]) || Immutable.Map()) as Immutable.Map<string, any>
      ),
      getItem = createSelector(
        getData,
        (state : State, id : any) => String(id),
        (data, id) => (
          data.get(id)
        ),
      ),
      shouldFetch = createSelector(
        isFetching,
        getFetchedSelector,
        getError,
        (isFetchingValue, isFetched, error) => (
          !isFetchingValue &&
          !isFetched &&
          error === noError
        ),
      ),
      isFetched = createSelector(
        getFetchedSelector,
        getError,
        (isFetchedState, error) => isFetchedState && error === noError,
      ),
      hasError = createSelector(
        getError, (error) => error !== noError,
      ),
      selectors = {
        shouldFetch,
        getData,
        hasBeenFetched,
        getItem,
        isFetched,
        hasError,
        getError,
        isFetching,
      };

    return {
      key,
      selectors,
      actions: {
        clearAll   : clearAllAction,
        clearToken : clearTokenAction,
        addItem,
        modifyItem,
        deleteItem,
      },
      Load: createLoadGenericData({
        url,
        normalizeResult,
        selectors,
        key,
      }),
      reducer,
    };
  };
