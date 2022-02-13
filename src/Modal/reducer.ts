import type { Action, State } from "types";
import * as Immutable from "immutable";

const initialState = Immutable.List(),

  showModal = (state: any, {
    payload: {
      modalType,
      modalProps,
    },
  } : { payload : { modalType : any, modalProps : any }}) => state.push(Immutable.Map({
    type  : modalType,
    props : Immutable.Map(modalProps),
  })),
  hideModal = (state: any) => state.pop(),

  reducer = (state: any = initialState, action: Action) => {
    switch (action.type) {
      case "SHOW_MODAL":
        return showModal(state, action);

      case "HIDE_MODAL":
        return hideModal(state);

      default:
        return state;
    }
  },

  getModals = (state: State) => state.get("modal") || Immutable.List();

export const selectors = {
  getModals,
};
export default reducer;
