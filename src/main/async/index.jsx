// @flow
/* eslint-disable new-cap, react/prefer-stateless-function, react/require-optimization */


import Loadable from "react-loadable";
import React from "react";

import { injectModals } from "../Modal/util";
import loading from "../RouteLoading";
import { injectReducer } from "redux-injector";

export const injectPaginator = ({ key, entities, pagination }) => {
  injectReducer(`entities.${key}`, entities);
  injectReducer(`paginations.${key}`, pagination);
};

const renderWithReducer = (route, props) => {
  const { Component, reducers, modals, paginators } = route.default;

  if (reducers) {
    alert("Do it before"); // eslint-disable-line
  }

  if (modals) {
    injectModals(modals);
  }

  if (paginators) {
    injectPaginator(paginators);
  }

  return <Component {...props} />;
};

export const asyncRoute = (loader) => Loadable({
  ...loading,
  loader,
  render: renderWithReducer,
});
