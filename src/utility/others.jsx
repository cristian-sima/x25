// @flow

import type { List as ImmutableList, Map as ImmutableMap } from "immutable";
import type { Action } from "types";

import React from "react";
import { SubmissionError } from "redux-form/immutable";

export const mql = window.matchMedia("(min-width: 800px)");

export const getDateSortNumber = (item) => (
  Number(new Date(item).getTime())
);

export const createModal = (modalType : string, modalProps? : any) : Action => ({
  type    : "SHOW_MODAL",
  payload : {
    modalType,
    modalProps,
  },
});

export const
  noError = "",
  rowsPerLoad = 50,
  nothingFetched = -1;

export const removeID = (payload : ImmutableMap<string, any>) => (list : ImmutableList<string>) => (
  list.delete(list.findIndex((current : string) => current === String(payload.get("ID"))))
);

export const addID = (payload : ImmutableMap<string, any>) => (list : ImmutableList<string>) => (
  list.push(String(payload.get("ID")))
);

export const ReduxFormSubmissionError = (error? : string) => {
  if (error) {
    if (error instanceof SubmissionError) {
      throw error;
    }

    const _error = typeof error.error === "string" ? error.error : "Am pierdut conexiunea cu server-ul";

    throw new SubmissionError({
      _error,
    });
  }
};

export const delay = () => (
  new Promise((resolve) => {
    setTimeout(resolve);
  }) : Promise<any>
);

export const showCheck = (value : boolean) => (
  value ? (
    <i className="fa fa-check text-success" />
  ) : null
);

export const userHasPressedCKeyAlone = (currentEvent : KeyboardEvent) : boolean => {
  const {
    ctrlKey,
    keyCode,
    srcElement: {
      localName,
    },
  } = currentEvent;

  const
    createInvoiceKey = 67,
    tag = localName.toLowerCase(),
    isNotInputOrTextarea = (
      tag !== "input" &&
      tag !== "textarea"
    );

  return (
    !ctrlKey &&
    keyCode === createInvoiceKey &&
    isNotInputOrTextarea
  );
};
