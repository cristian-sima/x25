// import * as React from "react";
import type { ModalsTypes } from "../Modal/types";
import type { State } from "src/types";

export type Reducer = (state: State, action: any) => any;

// export type Reducers = {
//   [key : string] : Reducer
// }
export type Reducers = any;

export type ReducerOptionsType = {
  key: string;
  func: Reducer;
};
export type PaginatorType = {
  key: string;
  itemsReducer: Reducer;
  pagesReducer: Reducer;
};
export type ReducersTypes = Array<ReducerOptionsType> | ReducerOptionsType;
export type PaginatorsTypes = Array<PaginatorType> | PaginatorType;

export type ModuleParts = {
  module: string;
  Component: any;

  reducers?: ReducersTypes;
  modals?: ModalsTypes;
  paginators?: PaginatorsTypes;
};

export type Loaded = {
  default : ModuleParts;
}


export type InitModule = (module: ModuleParts, moduleIsLoadedCb: () => any) => any;

