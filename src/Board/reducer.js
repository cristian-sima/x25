// @flow

const
  InitBoard = "INIT_BOARD",
  UpdateBoard = "UPDATE_BOARD",
  ClearFromBoard = "CLEAR_FROM_BOARD";

export const initBoard = (key : string, value : any) => ({
  type    : InitBoard,
  payload : {
    key,
    value,
  },
});

export const updateBoard = (key : string, value : any) => ({
  type    : UpdateBoard,
  payload : {
    key,
    value,
  },
});

export const clearFromBoard = (key : string) => ({
  type    : ClearFromBoard,
  payload : {
    key,
  },
});

const reducer = (state : any, action : any) => {
  const { payload } = action;

  switch (action.type) {
    case InitBoard:
      if (state.has(payload.key)) {
        return state;
      }

      return state.set(payload.key, payload.value);

    case UpdateBoard:
      return state.mergeIn([payload.key], payload.value);

    case ClearFromBoard:
      return state.delete(payload.key);
    default:
      return state;
  }
};


export const getFromBoard = (state : any, key : string, defaultValues : any) => {
  const myValue = state.getIn([
    "board",
    key,
  ]);

  if (typeof myValue === "undefined") {
    return defaultValues;
  }

  return myValue;
};


export default reducer;
