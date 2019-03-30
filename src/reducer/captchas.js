/* --- disabled flow */

import * as Immutable from "immutable";

const initialState = Immutable.Map();

const
  showCaptcha = (state : any, { payload : { name, id } }) => (
    state.set(name, id)
  ),
  hideCaptcha = (state : any, { payload }) => (
    state.delete(payload)
  );

const authReducer = (state : any = initialState, action : any) => {
  switch (action.type) {
    case "SHOW_CAPTCHA":
      return showCaptcha(state, action);

    case "HIDE_CAPTCHA":
      return hideCaptcha(state, action);

    default:
      return state;
  }
};

export default authReducer;
