// @flow

import paginators, { selectors as paginatorSelectors } from "../Paginator/reducer";
import modal, { selectors as modalSelectors } from "../Modal/reducer";
import account, { selectors as accountSelectors } from "../Account/reducer";
import auth, { selectors as authSelectors } from "./auth";
import counties, { selectors as countySelectors } from "./counties";

export default {
  ...paginators,
  account,
  auth,
  modal,
  counties,
};

export const selectors = {
  ...authSelectors,
  ...accountSelectors,
  ...modalSelectors,
  ...paginatorSelectors,
  ...countySelectors,
};
