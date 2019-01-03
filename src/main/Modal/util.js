// @flow

let all = {};

export const injectModals = (newModals : any) => {
  all = {
    ...all,
    ...newModals,
  };
};

export const getModal = (type) => all[type];
