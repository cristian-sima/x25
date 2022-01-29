// @flow

export const
  DateFormat = "DD.MM.YEAR",
  words = {
    PleaseWait       : "Please wait...",
    TryAgain         : "Try again",
    LoadingData      : "Loading data...",
    ThereWasAProblem : "There was a problem. Try again",

    NoErrorPassed : "No ErrorBoundary passed to x25",
    ItLoadsSlower : "It seems that it loads slower than usual. Please wait... ",

    TryingToRecover: "Trying to recover...",

    SomethingIsNotImmutable: "Something is not immutable. check console",

    // header
    ConnectionLost              : "I lost the connection to server. Try again.",
    Options                     : "Options",
    TermsAndConditions          : "Terms and conditions",
    PrivacyPolicy               : "Privacy Policy",
    SelectCompany               : "Select company",
    Toggle                      : "Toggle",
    Settings                    : "Settings",
    RenewSubscription           : "Renew subscription",
    TheSubscriptionWillExpireIn : "The subscription will expire in",
    SignOut                     : "Sing out",
    NoOptions                   : "No options",

    // inputs
    BankAccount         : "Bank Account",
    BankName            : "Bank Name",
    FiscalID            : "Fiscal ID",
    GetDataFromInternet : "Getting the data from the Internet",
    EnterAValidFiscalID : "Please type a valid fiscal ID",
    PersonalID          : "Personal ID",
    County              : "County",
    Select              : "Select",

    CaptchaDescription: `The purpose of this check is to distinguish a person from a robot. 
  This code usually appears when a feature in the application is overused`,

    CaptchaTypeNumbers : "Type numbers from the image below",
    CaptchaVerify      : "Verification",
    DateFormat,

    ErrorNeverExisted : "It may have been deleted or never existed",
    ErrorConnection   : `There seems to be a problem with your server or your internet connection
   has been interrupted.`,

    Sentry: {
      TellUs: {
        title     : "It seems we have a problem",
        subtitle  : "Our team has been announced.",
        subtitle2 : `If you want to help us, tell us what happened below.
        It will help us a lot`,
        labelName     : "Your name",
        labelEmail    : "Email",
        labelComments : "What happened?",
        labelClose    : "Close",
        labelSubmit   : "Send",
        errorGeneric  : `An unknown error occurred while sending the report
        Please try again`,
        errorFormEntry : "Some fields were invalid. Please correct the errors and try again.",
        successMessage : "Your feedback has been sent. Thanks!",
      },
      Message: `This message appears when the program failed and failed
    to recover. The administrator has been automatically notified about
    this problem. All we have to do is apologize.`,
      Button : "Tell us",
      Hint   : "Tip: Try refreshing the page - press the key",
    },

    // validation
    PleaseSelect          : "Please select",
    EnterValidPersonalID  : "Type a valid personal ID",
    EnterValidFiscalID    : "Type a valid fiscal ID",
    EnterValidBankAccount : "Type a valid bank account",
    EnterValidEmail       : "Type a valid email",
    EnterValidDate        : `Type a valid date (${DateFormat})`,
    NumberBetween         : "between",
    NumberAnd             : "and",
    NumberUpTo            : "up to",
    NumberGreaterThan     : "grater than",
    NumberMustBe          : "Must be a number",
    NumberInteger         : "integer",
    NumberFloat           : "float",
    Chars                 : "chars",
    Has                   : "has",
    TheField              : "The field",
    Has6Digits            : "The code has 6 digits",
    CodeNotValid          : "The code is not valid",
    AddARow               : "Add at least a row",

    message: {
      failPerform   : "Could not perform task",
      confirmDelete : "I deleted successfully",
      confirmAdd    : "Successfully added",
      confirmUpdate : "Updated data",
    },
    label: {
      modify       : "Modify",
      add          : "Add",
      remove       : "Delete",
      confirmation : "Confirm",
      cancel       : "Cancel",
    },

    Month: {
      0  : "January",
      1  : "February",
      2  : "March",
      3  : "April",
      4  : "May",
      5  : "June",
      6  : "July",
      7  : "August",
      8  : "September",
      9  : "October",
      10 : "November",
      11 : "December",
    },

    getNumberTense: (value : number) => String(value),
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

