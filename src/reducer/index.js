// @flow

import modal, { selectors as modalSelectors } from "../Modal/reducer";
import account, { selectors as accountSelectors } from "../Account/reducer";

import auth, { selectors as authSelectors } from "./auth";
import module from "./module";

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
};

export {
  state,
  selectors,
};
