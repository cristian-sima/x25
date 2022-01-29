// @flow

import type { List as ImmutableList, Map as ImmutableMap } from "immutable";

type ReduxError = {
  error: any;
}

import React from "react";
import { SubmissionError } from "redux-form/immutable";

import words from "../words";

export const getDateSortNumber = (item : string) => (
  Number(new Date(item).getTime())
);

export const isAdministratorAccount = (current : number) => (
  current === 0
);

export const createModal = (modalType : string, modalProps? : any) => ({
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
  // $FlowFixMe
  list.delete(list.findIndex((current : string) => current === String(payload.get("ID"))))
);

export const addID = (payload : ImmutableMap<string, any>) => (list : ImmutableList<string>) => (
  list.push(String(payload.get("ID")))
);

export const ReduxFormSubmissionError = (error? : ReduxError) => {
  if (error) {
    if (error instanceof SubmissionError) {
      throw error;
    }

    const _error = typeof error.error === "string" ? error.error : words.ThereWasAProblem;

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


export const years = [
  {
    value : 2018,
    name  : "2018",
  },
  {
    value : 2019,
    name  : "2019",
  },
  {
    value : 2020,
    name  : "2020",
  },
  {
    value : 2021,
    name  : "2021",
  },
];

export const months = [
  {
    value : 0,
    name  : words.Month[0],
  },
  {
    value : 1,
    name  : words.Month[1],
  },
  {
    value : 2,
    name  : words.Month[2],
  },
  {
    value : 3,
    name  : words.Month[3],
  },
  {
    value : 4,
    name  : words.Month[4],
  },
  {
    value : 5,
    name  : words.Month[5],
  },
  {
    value : 6,
    name  : words.Month[6],
  },
  {
    value : 7,
    name  : words.Month[7],
  },
  {
    value : 8,
    name  : words.Month[8],
  },
  {
    value : 9,
    name  : words.Month[9],
  },
  {
    value : 10,
    name  : words.Month[10],
  },
  {
    value : 11,
    name  : words.Month[11],
  },
];
