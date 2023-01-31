/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
import Immutable from "immutable";
import { createSelector } from "reselect";
import { noError } from "../utility";
import createLoadGenericData, { CreateGenericOptions } from "./LoaderRender";

type State = Immutable.Map<string, any>;

const
  initialStatusState = Immutable.Map({
    errorMessage : noError,
    fetched      : false,
    fetching     : true,
  }),
  statusReducer = "status",
  initialState = Immutable.Map({
    [statusReducer] : Immutable.Map(),
    data            : Immutable.Map(),
  }),
  pending = (state: State, { meta : { arg } } : any) => (
    state.mergeIn([statusReducer, arg], initialStatusState)
  ),
  rejected = (state: State, { meta : { arg } } : any) => (
    state.mergeDeepIn([statusReducer, arg], Immutable.Map({
      errorMessage : "Error",
      fetching     : false,
    }))
  ),
  setItem = (state: State, { payload } : any) => (
    state.setIn(
      ["data", String(payload.get("ID"))], payload,
    )
  ),
  deleteItemReducer = (state: State, { payload } : any) => state.deleteIn(
    ["data", String(payload.get("ID"))],
  );

export const
  createLoader = ({ key, url, normalizeResult } : CreateGenericOptions) => {
    const reducer = (state: State = initialState, action: any) => {
        switch (action.type) {
          case `${key}/pending`:
            return pending(state, action);

          case `${key}/rejected`:
            return rejected(state, action);

          case `${key}/fulfilled`:
            return (
              state.
                setIn([statusReducer, action.meta.arg], (
                  Immutable.Map({
                    fetched  : true,
                    fetching : false,
                    error    : noError,
                  })
                )).
                mergeDeepIn(["data"], action.payload)
            );

          case `${key}/clear-all`:
            return initialState;

          case `${key}/add`:
          case `${key}/modify`:
            return setItem(state, action);

          case `${key}/delete`:
            return deleteItemReducer(state, action);

          default:
            return state;
        }
      },
      addItem = (payload: any) => ({
        type: `${key}/add`,
        payload,
      }),
      modifyItem = (payload: any) => ({
        type: `${key}/modify`,
        payload,
      }),
      deleteItem = (payload: any) => ({
        type: `${key}/delete`,
        payload,
      }),
      isFetching = (state: State, token : string) => (state.getIn([key, statusReducer, token, "fetching"]) || false) as boolean,
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
      clearAllAction = () => ({
        type: `${key}/clear-all`,
      }),
      selectors = {
        shouldFetch,
        getData,
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
        clearAllAction,
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
