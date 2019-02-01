// @flow

import * as Immutable from "immutable";
import type { State } from "src\\types";

const initialState = Immutable.Map({
  captchas   : Immutable.Map(),
  resetEmail : "",
  step       : 1,
});

const
  showCaptcha = (state : any, { payload : { name, id } }) => (
    state.setIn([
      "captchas",
      name,
    ], id)
  ),
  hideCaptcha = (state : any, { payload }) => (
    state.deleteIn([
      "captchas",
      payload,
    ])
  ),
  setResetEmail = (state : any, { payload }) => (
    state.
      merge({
        resetEmail : payload,
        step       : 2,
      }).
      setIn([
        "captchas",
        "reset",
      ], "")
  ),
  setstep = (state : any, { payload : { step } }) => (
    state.set("step", step)
  ),
  clearReset = (state : any) => (
    state.
      merge({
        resetEmail : "",
        step       : 1,
      }).
      setIn([
        "captchas",
        "reset",
      ], "")
  );

const authReducer = (state : any = initialState, action : any) => {
  switch (action.type) {
    case "SHOW_CAPTCHA":
      return showCaptcha(state, action);

    case "HIDE_CAPTCHA":
      return hideCaptcha(state, action);

    case "SET_RESET_EMAIL":
      return setResetEmail(state, action);

    case "SET_RESET_STEP":
      return setstep(state, action);

    case "CLEAR_RESET":
      return clearReset(state);

    default:
      return state;
  }
};

const
  getAuthCaptcha = (state : State, name : string) => (
    state.getIn([
      "auth",
      "captchas",
      name,
    ]) || ""
  ),
  getAuthResetEmail = (state : State) => state.getIn([
    "auth",
    "resetEmail",
  ]),
  getAuthResetStep = (state : State) => state.getIn([
    "auth",
    "step",
  ]);

export const selectors = {
  getAuthCaptcha,
  getAuthResetEmail,
  getAuthResetStep,
};

export default authReducer;
