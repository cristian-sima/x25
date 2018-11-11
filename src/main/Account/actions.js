// @flow

import type { Action } from "types";

import { fetchInitialInformation as fetchInitialInformationRequest } from "./request";

export const fetchInitialInformation = () : Action => ({
  type    : "FETCH_INITIAL_INFORMATION",
  payload : fetchInitialInformationRequest(),
});

export const showCaptcha = (payload : { id: string ; name : string }) : Action => ({
  type: "SHOW_CAPTCHA",
  payload,
});

export const hideCaptcha = (payload : string) : Action => ({
  type: "HIDE_CAPTCHA",
  payload,
});

export const clearReset = () : Action => ({
  type: "CLEAR_RESET",
});

export const setResetEmail = (Email : string) : Action => ({
  type    : "SET_RESET_EMAIL",
  payload : Email,
});

export const setResetStep = (step : number) : Action => ({
  type    : "SET_RESET_STEP",
  payload : {
    step,
  },
});
