// @flow
/* eslint-disable new-cap, react/prefer-stateless-function, react/require-optimization */

type injectPaginatorTypes = {
  key: string,
  entities: any;
  pagination: any;
};

import Loadable from "react-loadable";
import React from "react";

import { injectModals } from "../Modal/util";
import RouteLoading from "./RouteLoading";
import { injectReducer } from "redux-injector";

const
  timeout = 15000;

export let
  ErrorBoundary = () => (
    <div>{"No ErrorBoundary passed to x25"}</div>
  );

export const injectPaginator = ({ key, entities, pagination } : injectPaginatorTypes) => {
  injectReducer(`entities.${key}`, entities);
  injectReducer(`paginations.${key}`, pagination);
};

const renderWithReducer = (route, props) => {
  const { Component, reducers, modals, paginators } = route.default;

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

  if (modals) {
    injectModals(modals);
  }

  if (paginators) {
    if (Array.isArray(paginators)) {
      for (const paginator of paginators) {
        injectPaginator(paginator);
      }
    } else {
      injectPaginator(paginators);
    }
  }

  return <Component {...props} />;
};

export const setErrorBoundary = (theError) => {
  ErrorBoundary = theError;
};

export const createAsyncRoute = (loader) => Loadable({
  loader,
  loading : RouteLoading,
  render  : renderWithReducer,
  timeout,
});
