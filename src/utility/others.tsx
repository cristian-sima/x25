
// type ReduxError = {
//   error: any;
// };

import type { List as ImmutableList, Map as ImmutableMap } from "immutable";
import React from "react";

export const
  getDateSortNumber = (item: string) => Number(new Date(item).getTime()),
  isAdministratorAccount = (current: number) => current === 0,
  createModal = (modalType: string, modalProps?: any) => ({
    type    : "SHOW_MODAL",
    payload : {
      modalType,
      modalProps,
    },
  }),
  noError = "",
  rowsPerLoad = 50,
  nothingFetched = -1,
  removeID = (payload: ImmutableMap<string, any>) => (list: ImmutableList<string>) => (
    list.delete(list.findIndex((current: string) => current === String(payload.get("ID"))))
  ),
  addID = (payload: ImmutableMap<string, any>) => (
    (list: ImmutableList<string>) => list.push(String(payload.get("ID")))
  ),
  delay = () => (new Promise((resolve) => {
    setTimeout(resolve);
  }) as Promise<any>),
  showCheck = (value: boolean) => value ? <i className="fa fa-check text-success" /> : null,
  tryToCloseModalDefault = (cb?: () => any) => {
    if (typeof cb === "function") {
      cb();
    }
  };
