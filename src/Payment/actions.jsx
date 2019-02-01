// @flow

import { createModal } from "../utility";

import type { BankTransferArgsTypes } from "./types";

export const payUsingBankTransferModal = (
  (application : string, options : BankTransferArgsTypes) : any => (
    createModal("PAYMENT_BANK_TRANSFER", {
      application,
      options,
    })
  )
);
export const showTransferWasDone = () : any => (
  createModal("PAYMENT_WAS_DONE")
);
