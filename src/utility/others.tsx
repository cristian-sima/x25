import type { List as ImmutableList, Map as ImmutableMap } from "immutable";

type ReduxError = {
  error: any;
};
import React from "react";
import { SubmissionError } from "redux-form/immutable";
import { words } from "./words";

export const getDateSortNumber = (item: string) => Number(new Date(item).getTime());
export const isAdministratorAccount = (current: number) => current === 0;
export const createModal = (modalType: string, modalProps?: any) => ({
  type    : "SHOW_MODAL",
  payload : {
    modalType,
    modalProps,
  },
});
export const noError = "",
  rowsPerLoad = 50,
  nothingFetched = -1,
  removeID = (payload: ImmutableMap<string, any>) => (list: ImmutableList<string>) => (
    list.delete(list.findIndex((current: string) => current === String(payload.get("ID"))))
  ),
  addID = (payload: ImmutableMap<string, any>) => (
    (list: ImmutableList<string>) => list.push(String(payload.get("ID")))
  ),
  ReduxFormSubmissionError = (error?: ReduxError) => {
    if (error) {
      if (error instanceof SubmissionError) {
        throw error;
      }

      const _error = typeof error.error === "string" ? error.error : words.ThereWasAProblem;

      throw new SubmissionError({
        _error,
      });
    }
  },
  delay = () => (new Promise((resolve) => {
    setTimeout(resolve);
  }) as Promise<any>),
  showCheck = (value: boolean) => value ? <i className="fa fa-check text-success" /> : null;
