import * as Immutable from "immutable";

const initialState = Immutable.Map(),

  initModule = (state: any, {
    payload,
  }) => state.set(payload, true),

  reducer = (state: any = initialState, action: any) => {
    switch (action.type) {
      case "INIT_MODULE":
        return initModule(state, action);

      default:
        return state;
    }
  },

  getIsModuleReady = (state: any, id: string) => state.getIn(["module", id]) || false,

  moduleIsReadyAction = (payload: string) => ({
    type: "INIT_MODULE",
    payload,
  });

export {
  getIsModuleReady,
  moduleIsReadyAction,
};
export default reducer;
