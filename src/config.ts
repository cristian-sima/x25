export let config: any = {};

const getReducerState = (module: string) => (state : any) => {
  if (config.isMutable) {
    return state[module];
  }

  return state.get(module);
};

export const
  setConfiguration = (current: any) => {
    config = current;
  },
  getAccountState = getReducerState("account"),
  getModulesState = getReducerState("module"),
  getModalsState = getReducerState("modal"),
  getNotificationState = getReducerState("notifications");

