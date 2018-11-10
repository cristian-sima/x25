// @flow

import type { ErrorType, NormalizedResult } from "types";
import type { Map as ImmutableMap } from "immutable";

export type Actions =
| { type: "SHOW_MODAL"; payload: {| modalType : string; modalProps? : any; |}; }
| { type: "HIDE_MODAL"; }

// notifications
| { type: "DELETE_NOTIFICATION"; payload: number }

// auth
| { type: "SHOW_CAPTCHA"; payload: { id: string; name: string; }; }
| { type: "HIDE_CAPTCHA"; payload: string; }
| { type: "SHOW_RESET_CAPTCHA"; payload: string; }
| { type: "CLEAR_RESET"; }
| { type: "HIDE_RESET_CAPTCHA"; }
| { type: "SET_RESET_EMAIL"; payload: string; }
| { type: "SET_RESET_TOKEN"; payload: { Token: string; }; }
| { type: "SET_RESET_STEP"; payload: { step: number; }; }

// info
| { type: "FETCH_INITIAL_INFORMATION"; payload: any; }
| { type: "ACCOUNT_SET_RESET_PASSWORD_EMAIL"; payload: any; }
| { type: "FETCH_INITIAL_INFORMATION_PENDING"; }
| { type: "FETCH_INITIAL_INFORMATION_REJECTED"; payload: { error: ErrorType; }; }
| { type: "FETCH_INITIAL_INFORMATION_FULFILLED"; payload: {
  IsConnected: boolean;
  Account: any;
  Counties: any;
}; }
| { type: "ACCOUNT_CHANGE_PASSWORD"; }


// accounts
| { type: "ADD_ACCOUNT"; payload: any; }
| { type: "MODIFY_ACCOUNT"; payload: any; }
| { type: "DELETE_ACCOUNT"; payload: any; }
| { type: "TOGGLE_ACCOUNT_STATE"; payload: { id: string; IsActive : boolean; }; }
| { type: "RESET_PASSWORD_ACCOUNT"; payload: { id: string; }; }

// salary
| { type: "FETCH_SALARY_CONFIGURATION"; payload: any }
| { type: "MODIFY_SALARY_CONFIGURATION"; payload: any }
| { type: "FETCH_SALARY_CONFIGURATION"; payload: any; meta: { id : number; } }
| { type: "FETCH_SALARY_CONFIGURATION_PENDING"; payload: any; meta: { id : number; } }
| { type: "FETCH_SALARY_CONFIGURATION_FULFILLED"; payload: {
SalaryConfiguration : ImmutableMap<string, any>;
Jobs : NormalizedResult;
InsuranceInstitutions : NormalizedResult;
MedicalLeaves : NormalizedResult;
}; meta: { id : number; } }
| { type: "FETCH_SALARY_CONFIGURATION_REJECTED"; payload: any; meta: { id : number; } }

| { type: "MODIFY_MEDICAL_LEAVE"; payload: any; }

// bank holidays
| { type: "FETCH_BANK_HOLIDAYS"; payload: any; meta: { year: string; }; }
| { type: "FETCH_BANK_HOLIDAYS_PENDING"; meta: { year: string; }; }
| { type: "FETCH_BANK_HOLIDAYS_REJECTED"; payload: { error: ErrorType; }; meta: { year : string; }; }
| { type: "FETCH_BANK_HOLIDAYS_FULFILLED"; payload: any; meta: { year: string; }; }
| { type: "ADD_BANK_HOLIDAY"; payload: { BankHoliday: any; MonthInfo: any; }; }
| { type: "MODIFY_BANK_HOLIDAY"; payload: { BankHoliday: any; MonthInfo: any; }; }
| { type: "DELETE_BANK_HOLIDAY"; payload: any; }
| { type: "LOAD_BANK_HOLIDAYS"; payload: any; meta: { year : string; previousYear: string; }; }
| { type: "LOAD_BANK_HOLIDAYS_PENDING"; meta: { year : string; previousYear: string; }; }
| { type: "LOAD_BANK_HOLIDAYS_REJECTED";
  payload: { error: ErrorType; };
  meta: { year : string; previousYear: string; };
}
| { type: "LOAD_BANK_HOLIDAYS_FULFILLED"; payload: any; meta: { year : string; previousYear: string; }; }
