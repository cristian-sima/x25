// @flow

import modal, { selectors as modalSelectors } from "../Modal/reducer";
import account, { selectors as accountSelectors } from "../Account/reducer";

import auth, { selectors as authSelectors } from "./auth";

import immutableRouting from "./immutable-routing";

const state = {
  account,
  auth,
  modal,
};

const selectors = {
  ...authSelectors,
  ...accountSelectors,
  ...modalSelectors,
};

export {
  state,
  selectors,
  immutableRouting,
};
