// @flow

import Big from "big.js";

const up = 3;

export const
// in LEI 16.01.2019
  pricePerMonth = 10.99,
  getPrice = (months : number) => parseFloat(
    new Big(months).
      times(new Big(pricePerMonth)).
      round(0,
        up)
  );
