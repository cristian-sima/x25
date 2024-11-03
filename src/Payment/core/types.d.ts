

export type PaymentOptions = {
  reference: string;
}

export type PaymentBankTransferArgsTypes = any;
// Immutable.Map({
//   Credits,
//   companyID,
//   amount,
// }),

export type PaymentPayUsingBankTransferType = (application: string, options: PaymentBankTransferArgsTypes) => void;

export type PaymentBankTransferConfirmForm = {
  Details: string;
  TransferNumber: string;
}