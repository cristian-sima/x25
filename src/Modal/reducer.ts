import type { Action, State } from "src/types";

const

  showModal = (state: any, { payload: { modalType, modalProps } } : any) => {
    state.push({
      type  : modalType,
      props : modalProps,
    });

    return state;
  },
  hideModal = (state: any) => {
    state.pop();

    return state;
  },

  reducer = (state: any = [], action: Action) => {
    switch (action.type) {
      case "SHOW_MODAL":
        return showModal(state, action);

      case "HIDE_MODAL":
        return hideModal(state);

      default:
        return state;
    }
  },

  getModals = (state: State) => state.modal || [];

export const selectors = {
  getModals,
};
export default reducer;
