/* eslint-disable no-prototype-builtins */
import { createStore, combineReducers } from "redux";
import { injectModals as performInjectModals } from "../Modal/util";
import { CombineReducersError, has, set } from "./helpers";
import { InitModule, PaginatorType, Reducer, Reducers } from "./types";

let
  store : any = {
    injectedReducers: {},
  },
  combine = combineReducers;

const
  combineReducersRecurse = (reducers : any) => {
  // If this is a leaf or already combined.
    if (typeof reducers === "function") {
      return reducers;
    }

    // If this is an object of functions, combine reducers.
    if (typeof reducers === "object") {
      const combinedReducers : Reducers = {};

      for (const key of Object.keys(reducers)) {
        combinedReducers[key] = combineReducersRecurse(reducers[key]);
      }
      return combine(combinedReducers);
    }

    // If we get here we have an invalid item in the reducer path.
    throw new CombineReducersError("Invalid item in reducer tree", reducers);
  };

export const
  createInjectStore = (initialReducers: Reducers, ...args: any[]) => {
    // If last item is an object, it is overrides.
    if (typeof args[args.length - 1] === "object") {
      const
        overrides = args.pop(),
        overridesExists = (
          overrides.hasOwnProperty("combineReducers") &&
          typeof overrides.combineReducers === "function"
        );

      if (overridesExists) {
        combine = overrides.combineReducers;
      }
    }

    store = createStore(
      combineReducersRecurse(initialReducers),
      ...args,
    );

    store.injectedReducers = initialReducers;

    return store;
  },
  initModule : InitModule = ({ reducers, modals, paginators }, moduleIsLoadedCb) => {
    const
      injectReducer = (key : string, reducer : Reducer, force = false) => {
        if (has(store.injectedReducers, key) || force) {
          return;
        }

        set(store.injectedReducers, key, reducer);
        store.replaceReducer(combineReducersRecurse(store.injectedReducers));
      },
      injectReducers = () => {
        if (reducers) {
          if (Array.isArray(reducers)) {
            for (const { key, func } of reducers) {
              injectReducer(key, func);
            }
          } else {
            const { key, func } = reducers;

            injectReducer(key, func);
          }
        }
      },
      injectModals = () => {
        if (modals) {
          performInjectModals(modals);
        }
      },
      injectPaginators = () => {
        const injectPaginator = ({ key, itemsReducer, pagesReducer }: PaginatorType) => {
          injectReducer(`entities.${key}`, itemsReducer);
          injectReducer(`paginations.${key}`, pagesReducer);
        };

        if (paginators) {
          if (Array.isArray(paginators)) {
            for (const paginator of paginators) {
              injectPaginator(paginator);
            }
          } else {
            injectPaginator(paginators);
          }
        }
      };

    injectReducers();
    injectModals();
    injectPaginators();

    moduleIsLoadedCb();
  };

