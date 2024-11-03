
/*
// // ApplicationCodeSMSAlert ---
// ApplicationCodeSMSAlert = "smsalert"
// // DescriptionSMSAlert ---
// // example smsalert-1000-3
// // the nr. of credits is 1000
// // the company id is 3
// DescriptionSMSAlert = `
// <br><br>
// <b>smsalert</b><br>
// arg1: <b>credits</b><br>
// arg2: <b>companyID</b><br><br>
*/
const SIDEWORK_APP_SIDENOTE_SMS = "smsalert",

  /*
// // ApplicationCodeInvoiceService ---
// ApplicationCodeInvoiceService = "facturare"
// // DescriptionInvoiceService ---
// // example facturare-2-76
// // the nr. of months is 2
// // the company id is 76
// DescriptionInvoiceService = `
// <b>facturare</b><br>
// arg1: <b>months</b><br>
// arg2: <b>companyID</b><br><br>
*/
  SIDEWORK_APP_INVOICES_SUBSCRIPTION = "facturare",

  /*
// // ApplicationCodeAutoService ---
// ApplicationCodeAutoService = "auto"
// // DescriptionInvoiceService ---
// // example facturare-2-76
// // the nr. of months is 2
// // the company id is 76
// DescriptionAutoService = `
// <b>auto</b><br>
// arg1: <b>months</b><br>
// arg2: <b>companyID</b><br><br>
*/
  SIDEWORK_APP_SIDENOTE_SUBSCRIPTION = "auto";

export type SIDEWORK_APPLICATION = typeof SIDEWORK_APP_SIDENOTE_SMS |
typeof SIDEWORK_APP_INVOICES_SUBSCRIPTION |
typeof SIDEWORK_APP_SIDENOTE_SUBSCRIPTION

export {
  SIDEWORK_APP_INVOICES_SUBSCRIPTION,
  SIDEWORK_APP_SIDENOTE_SMS,
  SIDEWORK_APP_SIDENOTE_SUBSCRIPTION,
};

