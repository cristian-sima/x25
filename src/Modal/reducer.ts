import * as Immutable from "immutable";
import { getModalsState } from "../config";
import { Modals } from "./types";
import type { Action, State } from "src/types";

const initialState = Immutable.List<Immutable.Map<string, any>>(),

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
  softHideModal = (state: any) => {
    const lastPosition = -1;

    return (
      state.update(lastPosition, (lastMap: Immutable.Map<string, any>) => (
        lastMap.set("pleaseClose", true)
      ))
    );
  },

  reducer = (state: any = initialState, action: Action) => {
    switch (action.type) {
      case "SHOW_MODAL":
        return showModal(state, action);

      case "HIDE_MODAL":
        return hideModal(state);

      case "SOFT_HIDE_MODAL":
        return softHideModal(state);

      default:
        return state;
    }
  },

  getModals = (state: State) => (getModalsState(state) || initialState) as Modals;

export const selectors = {
  getModals,
};
export default reducer;
