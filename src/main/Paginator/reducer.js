// @flow

import { combineReducers } from "redux-immutable";

import { paginatorReducers as admin } from "Admin";
import { paginatorReducers as company } from "Company";

const entitiesReducers = combineReducers({
  ...admin.entities,
  ...company.entities,
});

const paginationsReducers = combineReducers({
  ...admin.paginations,
  ...company.paginations,
});

// @flow

import type { State } from "src/types";

import { createSelector } from "reselect";

export const
  getPaginatorPaginations = (state : State, name : string) => state.getIn([
    "paginations",
    name,
  ]),
  getPaginatorEntities = (state : State, name : string) => state.getIn([
    "entities",
    name,
  ]),
  getPaginators = createSelector(
    getPaginatorPaginations,
    getPaginatorEntities,
    (list, entities) => ({
      list,
      entities,
    })
  );

export const selectors = {
  getPaginatorPaginations,
  getPaginatorEntities,
  getPaginators,
};

export default {
  entities    : entitiesReducers,
  paginations : paginationsReducers,
};
