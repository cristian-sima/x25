/* eslint-disable no-undefined */
import Immutable from "immutable";
import { validateString } from "../../../utility";

const
  TransferNumber = validateString({
    optional : false,
    min      : 1,
    max      : 500,
  });

export default  Immutable.Map({
  TransferNumber,
});
