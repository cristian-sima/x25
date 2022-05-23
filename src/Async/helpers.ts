/* eslint-disable prefer-object-has-own */
/* eslint-disable no-undefined */

import { Reducers } from "./types";

export const
  has = (obj : any, key : string) : boolean => {
    const keyParts = key.split(".");

    return Boolean(obj) && (
      keyParts.length > 1
        ? has(obj[key.split(".")[0]], keyParts.slice(1).join("."))
        : Object.hasOwnProperty.call(obj, key)
    );
  },
  get = (obj: any, key: string, defaultValue: any) => {


    let theObject = obj;

    const
      theKey = typeof key === "string" && String(key).includes(".") ? key.split(".") : key,
      getKey = (current: number) => {
        if (typeof theObject !== "object") {
          return undefined;
        }

        return theObject[theKey[current]];
      };

    for (let current = 0; current < theKey.length; current += 1) {
      theObject = theObject ? getKey(current) : undefined;
    }


    return theObject === undefined ? defaultValue : theObject;
  },
  /* eslint-disable */
  set = (obj : any, keys : any, val : any) => {
	keys.split && (keys=keys.split('.'));
	var i=0, l=keys.length, t=obj, x, k;
	while (i < l) {
		k = keys[i++];
		if (k === '__proto__' || k === 'constructor' || k === 'prototype') break;
		t = t[k] = (i === l) ? val : (typeof(x=t[k])===typeof(keys)) ? x : (keys[i]*0 !== 0 || !!~(''+keys[i]).indexOf('.')) ? {} : [];
	}
}


export class CombineReducersError extends Error {
  reducers: Reducers;

  constructor (message : string, reducers : Reducers) {
    super(message);
    this.name = "CombineReducersError";
    this.reducers = reducers;
  }
}