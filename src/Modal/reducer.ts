import * as Immutable from "immutable";
import { getModalsState } from "../config";
import type { Action, State } from "src/types";

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

  getModals = (state: State) => (getModalsState(state) || initialState) as Immutable.List<Immutable.Map<string, any>>;

export const selectors = {
  getModals,
};
export default reducer;
