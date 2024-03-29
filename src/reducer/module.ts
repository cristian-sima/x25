import * as Immutable from "immutable";
import { getModulesState } from "../config";

const initialState = Immutable.Map(),

  initModule = (state: any, {
    payload,
  } : { payload : any }) => state.set(payload, true),

  reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
      case "INIT_MODULE":
        return initModule(state, action);

      default:
        return state;
    }
  },

  getIsModuleReady = (state: any, id: string) => getModulesState(state).get(id) || false,

  moduleIsReadyAction = (payload: string) => ({
    type: "INIT_MODULE",
    payload,
  });

export {
  getIsModuleReady,
  moduleIsReadyAction,
};
export default reducer;
