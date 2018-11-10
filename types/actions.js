// @flow

import type { Actions as Main } from "main/types";
import type { Actions as Admin } from "Admin/types";
import type { Actions as Company } from "Company/types";

export type Action =
| Main
| Admin
| Company
