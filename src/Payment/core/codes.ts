/* eslint-disable no-shadow */

/** Payment types for all sidework ecosystem  */
export enum SIDEWORK_APPLICATION {
  /** 
   * ApplicationCodeSMSAlert
   * Example: smsalert-1000-3
   * - credits: number of credits (e.g., 1000)
   * - companyID: ID of the company (e.g., 3)
   */
  SMS_ALERT = "smsalert",

  /** 
   * ApplicationCodeInvoiceService
   * Example: facturare-2-76
   * - months: number of months (e.g., 2)
   * - companyID: ID of the company (e.g., 76)
   */
  INVOICES_SUBSCRIPTION = "facturare",

  /** 
   * ApplicationCodeAutoService
   * Example: auto-2-76
   * - months: number of months (e.g., 2)
   * - companyID: ID of the company (e.g., 76)
   */
  SIDENOTE_SUBSCRIPTION = "auto",
}

// Usage example
export default SIDEWORK_APPLICATION;
