import type { ModalsTypes } from "./types";

let all : { [key: string]: any } = {};

export const
  injectModals = (newModals: ModalsTypes) => {
    all = { ...all,
    // $FlowFixMe
      ...newModals,
    };
  },
  getModal = (type: string) => all[type];
