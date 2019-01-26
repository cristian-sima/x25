// @flow

import { selectors as paginatorSelectors } from "../Paginator/selectors";
import modal, { selectors as modalSelectors } from "../Modal/reducer";
import account, { selectors as accountSelectors } from "../Account/reducer";

import auth, { selectors as authSelectors } from "./auth";
import counties, { selectors as countiesSelectors } from "./counties";

import immutableRouter from "./immutable-router";

const state = {
  account,
  counties,
  auth,
  modal,
};

const selectors = {
  ...authSelectors,
  ...accountSelectors,
  ...modalSelectors,
  ...paginatorSelectors,
  ...countiesSelectors,
};

export {
  state,
  selectors,
  immutableRouter,
};
