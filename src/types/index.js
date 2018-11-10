// @flow
/* eslint-disable no-use-before-define */

import type { List as ListType, Map as MapType } from "immutable";

export type NormalizedResult = {
  entities : MapType<string, any>;
  result : ListType<string>;
};
