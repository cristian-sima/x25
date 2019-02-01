// @flow

import type { ModalsTypes } from "./types";

let all = {};

export const injectModals = (newModals : ModalsTypes) => {
  all = {
    ...all,
    ...newModals,
  };
};

export const getModal = (type : string) => all[type];
