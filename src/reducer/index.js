// @flow

import modal, { selectors as modalSelectors } from "../Modal/reducer";
import account, { selectors as accountSelectors } from "../Account/reducer";
// import board from "../Board/reducer";

import auth, { selectors as authSelectors } from "./auth";
import module from "./module";

import immutableRouting from "./immutable-routing";

const state = {
  // board,
  module,
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
