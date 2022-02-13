/* eslint-disable max-len, no-duplicate-imports */
import type { NormalizedResult } from "types";

type Normalizr = (item: any) => any;
type NormalizeBoolean = (input: "" | boolean) => boolean;
type NormalizeArray = (raw: Array<any>) => NormalizedResult;
type Normalize = (raw: Array<any>, field: string, normalizr: Normalizr) => NormalizedResult;
type DefaultNormalize = (raw: Array<any>, field: string) => NormalizedResult;
type Resolve = (data: any) => void;
type Reject = (arg: any) => void;
type Response = {
  body: any;
};
type Error = {
  status: any;
};
import * as Immutable from "immutable";
import { words } from "./words";

const

  defaultNormalizr: Normalizr = (item) => Immutable.Map(item),

  defaultValue = () => ({
    entities : Immutable.Map(),
    result   : Immutable.List(),
  });

export const customNormalizeArrayByField: Normalize = (raw: Array<any>, field: string, normalizr: Normalizr) => raw === null ? defaultValue() : raw.reduce((previous, current) => {
  const stringID = String(current[field]);

  previous.entities = previous.entities.set(stringID, normalizr(current));
  previous.result = previous.result.push(stringID);
  return previous;
}, defaultValue());
export const normalizeArrayByField: DefaultNormalize = (raw: Array<any>, field: string) => customNormalizeArrayByField(raw, field, defaultNormalizr);
export const withPromiseCallback = (resolve: Resolve, reject: Reject) => (error: Error, response: Response) => {
  if (error) {
    const StatusUnauthorized = 401;

    if (error.status === StatusUnauthorized) {
      document.location.href = "/";
    } else {
      // error.message
      reject({
        error: words.ThereWasAProblem,
      });
    }
  } else {
    resolve(response.body);
  }
};


/*
 * entities ---> Object { "1": Immutable.Map(), ... ]) }
 * result ---> List([ "1", "2", "3" ])
 */
export const normalizeArray: NormalizeArray = (raw: Array<any>, normalizr?: Normalizr) => customNormalizeArrayByField(raw, "ID", typeof normalizr === "undefined" ? defaultNormalizr : normalizr);
export const normalizeBoolean: NormalizeBoolean = (value: boolean | "") => value || false;
export const normalizeSelectNumeric = (raw: string) => typeof raw === "string" && raw !== "" ? parseInt(raw, 10) : raw;
