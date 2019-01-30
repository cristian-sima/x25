// @flow

import modal, { selectors as modalSelectors } from "../Modal/reducer";
import account, { selectors as accountSelectors } from "../Account/reducer";

import auth, { selectors as authSelectors } from "./auth";
import module, { selectors as moduleSelectors } from "./module";

import immutableRouting from "./immutable-routing";

const state = {
  module,
  account,
  auth,
  modal,
};

const selectors = {
  ...authSelectors,
  ...accountSelectors,
  ...modalSelectors,
  ...moduleSelectors,
};

export {
  state,
  selectors,
  immutableRouting,
};
