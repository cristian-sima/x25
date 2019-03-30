// @flow

import modal, { selectors as modalSelectors } from "../Modal/reducer";
import account, { selectors as accountSelectors } from "../Account/reducer";

import auth, { selectors as authSelectors } from "./auth";
import module from "./module";
import captchas from "./captchas";

const state = {
  module,
  account,
  auth,
  modal,
  captchas,
};

const selectors = {
  getCaptcha: (currentState : any, id : string) => (
    currentState.getIn([
      "captchas",
      id,
    ])
  ),
  ...authSelectors,
  ...accountSelectors,
  ...modalSelectors,
};

export {
  state,
  selectors,
};
