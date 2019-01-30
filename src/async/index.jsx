// @flow
/* eslint-disable new-cap, react/prefer-stateless-function, react/require-optimization */

// type injectPaginatorTypes = {
//   key: string,
//   itemsReducer: any;
//   pagesReducer: any;
// };

import Loadable from "react-loadable";
import React from "react";

import RouteLoading from "./RouteLoading";
// import { injectReducer } from "redux-injector";
import InitModule from "./InitModule";

const
  timeout = 15000;

export let
  ErrorBoundary = () => (
    <div>{"No ErrorBoundary passed to x25"}</div>
  );

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

export const setErrorBoundary = (theError) => {
  ErrorBoundary = theError;
};

export const createAsyncRoute = (loader) => Loadable({
  loader,
  loading : RouteLoading,
  render  : InitModule,
  timeout,
});
