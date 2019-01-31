// @flow

import { createModal } from "../utility";

export const payUsingBankTransferModal = (application, options) : any => (
  createModal("PAYMENT_BANK_TRANSFER", {
    application,
    options,
  })
);
export const showTransferWasDone = () : any => (
  createModal("PAYMENT_WAS_DONE")
);
