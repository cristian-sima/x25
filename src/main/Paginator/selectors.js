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
