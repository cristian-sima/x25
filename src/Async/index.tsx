/* eslint-disable new-cap, react/prefer-stateless-function, react/require-optimization */
import * as React from "react";
import Loadable from "react-loadable";
import InitModule from "./InitModule";
import RouteLoading from "./RouteLoading";
import { Loaded } from "./types";

// type injectPaginatorTypes = {
//   key: string,
//   itemsReducer: any;
//   pagesReducer: any;
// };
// import { injectReducer } from "redux-injector";
// import { injectModals } from "../Modal/util";
const timeout = 15000;

export let ErrorBoundary = ({ children } : any) => (
  children
);

export let AppLogo : any = null;

// const injectPaginator = ({ key, itemsReducer, pagesReducer } : injectPaginatorTypes) => {
//   injectReducer(`entities.${key}`, itemsReducer);
//   injectReducer(`paginations.${key}`, pagesReducer);
// };
// const renderWithReducer = (route, props) => {
//   const { Component, reducers, modals, paginators } = route.default;
//
//   if (reducers) {
//     if (Array.isArray(reducers)) {
//       for (const { key, func } of reducers) {
//         injectReducer(key, func);
//       }
//     } else {
//       const { key, func } = reducers;
//
//       injectReducer(key, func);
//     }
//   }
//
//   if (modals) {
//     injectModals(modals);
//   }
//
//   if (paginators) {
//     if (Array.isArray(paginators)) {
//       for (const paginator of paginators) {
//         injectPaginator(paginator);
//       }
//     } else {
//       injectPaginator(paginators);
//     }
//   }
//
//   return <Component {...props} />;
// };
export const
  setErrorBoundary = (theError: any) => {
    ErrorBoundary = theError;
  },
  setAppLogo = (theLogo: any) => {
    AppLogo = theLogo;
  },
  createAsyncRoute = (loader : any) => Loadable({
    loader,
    loading : RouteLoading,
    render  : (loaded : Loaded, props : any) => (
      <InitModule loaded={loaded} props={props} />
    ),
    timeout,
  });
