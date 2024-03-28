import type { Action } from "src/types";

export const
  hideModal = (): Action => ({
    type: "HIDE_MODAL",
  }),
  clearModals = (): Action => ({
    type: "CLEAR_MODALS",
  }),
  softHideModal = (): Action => ({
    type: "SOFT_HIDE_MODAL",
  });
