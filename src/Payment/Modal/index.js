// @flow

import BankTransfer from "./BankTransfer";
import PaymentDone from "./PaymentDone";

const modals = {
  "PAYMENT_BANK_TRANSFER" : BankTransfer,
  "PAYMENT_WAS_DONE"      : PaymentDone,
};

export default modals;
