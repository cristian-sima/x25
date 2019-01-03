// @flow

import type { Action } from "src/types";

import { fetchInitialInformation as fetchInitialInformationRequest } from "./request";

export const fetchInitialInformation = (appName : string) : Action => ({
  type    : "FETCH_INITIAL_INFORMATION",
  payload : fetchInitialInformationRequest(appName),
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
