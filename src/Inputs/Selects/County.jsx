// @flow;

import type { State } from "src\\types";

import { connect } from "react-redux";
import { selectors } from "../../reducer";

import CustomSelect from "./Custom";

import { words } from "../../utility";

const
  mapStateToProps = (state : State) => ({
    data        : selectors.getCountiesSorted(state),
    label       : words.County,
    isImmutable : true,
    nameKey     : "Name",
    valueKey    : "Short",
  });

export default connect(mapStateToProps)(CustomSelect);
