// @flow

import * as calendar from "./calendar";
import * as date from "./date";
import * as language from "./language";
import * as normalize from "./normalize";
import * as numbers from "./numbers";
import * as others from "./others";
import * as strings from "./strings";
import * as validation from "./validation";

const all = {
  ...calendar,
  ...date,
  ...language,
  ...normalize,
  ...numbers,
  ...others,
  ...strings,
  ...validation,
};

export default all;
