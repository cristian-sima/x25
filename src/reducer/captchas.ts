import * as Immutable from "immutable";
import type { State } from "src/types";

const initialState = Immutable.Map(),

  showCaptcha = (state: any, {
    payload: {
      name,
      id,
    },
  } : { payload : { name : string, id : string }}) => state.set(name, id),
  hideCaptcha = (state: any, {
    payload,
  } : { payload : any }) => state.delete(payload),

  captchasReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
      case "SHOW_CAPTCHA":
        return showCaptcha(state, action);

      case "HIDE_CAPTCHA":
        return hideCaptcha(state, action);

      default:
        return state;
    }
  },

  getCaptcha = (state: State, name: string) => state.getIn(["captchas", name]) || "";

export const selectors = {
  getCaptcha,
};
export default captchasReducer;
