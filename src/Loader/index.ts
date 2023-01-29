/* eslint-disable import/no-named-as-default-member */
/* eslint-disable max-len */
import { createAction } from "@reduxjs/toolkit";
import Immutable from "immutable";
import { createSelector } from "reselect";
import { noError } from "../utility";
import createLoadGenericData, { CreateGenericOptions as LoaderOptions } from "./CreateLoad";

type State = Immutable.Map<string, any>;

export const
  statusReducer = "status",
  initialState = Immutable.Map({
    [statusReducer]: Immutable.Map({
      errorMessage : noError,
      fetched      : false,
      fetching     : false,
    }),
  }),
  pending = (state: State) => (
    state.mergeIn([statusReducer], Immutable.Map({
      errorMessage : noError,
      fetched      : false,
      fetching     : true,
    }))
  ),
  rejected = (state: State) => (
    state.mergeDeepIn([statusReducer], Immutable.Map({
      errorMessage : "Error",
      fetching     : false,
    }))
  ),
  fulfilled = (state: State, { payload } : any) => (
    state.mergeDeepIn(Immutable.Map({
      data            : payload,
      [statusReducer] : Immutable.Map({
        errorMessage : noError,
        fetching     : false,
        fetched      : true,
      }),
    }))
  ),
  createGenericLoader = ({ reducerName, url, normalizeResult } : LoaderOptions) => {
    const reducer = (state: any = initialState, action: any) => {
        switch (action.type) {
          case `${reducerName}/pending`:
            return pending(state);

          case `${reducerName}/rejected`:
            return rejected(state);

          case `${reducerName}/fulfilled`:
            return state.mergeDeep(Immutable.Map({
              [statusReducer]: Immutable.Map({
                fetched  : true,
                fetching : false,
                error    : noError,
              }),
              "data": action.payload,
            }));

          case `${reducerName}/clear`:
            return initialState;

          default:
            return state;
        }
      },
      isFetching = (state: State) => (state.getIn([reducerName, statusReducer, "fetching"]) || false) as boolean,
      getFetchedSelector = (state: State) => (state.getIn([reducerName, statusReducer, "fetched"]) || false)as boolean,
      getError = (state: State) => (
        (state.getIn([reducerName, statusReducer, "errorMessage"]) || noError) as string
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
      clearAction = createAction(`${reducerName}/clear`),
      selectors = {
        shouldFetch,
        isFetched,
        hasError,
        getError,
        isFetching,
      };

    return {
      stateSelectors : selectors,
      actions        : {
        clear: clearAction,
      },
      Load: createLoadGenericData({
        url,
        normalizeResult,
        selectors,
        reducerName,
      }),
      reducer,
    };
  };
