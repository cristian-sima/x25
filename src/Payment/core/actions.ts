

import { createModal } from "src/utility";

export const paymentPayUsingBankTransferModalAction = (
  (application : string, options : any) : any => (
    createModal("PAYMENT_BANK_TRANSFER", {
      application,
      options,
    })
  )
);

export const paymentShowBankTransferDoneAction = () : any => (
  createModal("PAYMENT_WAS_DONE")
);

