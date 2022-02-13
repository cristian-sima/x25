import type { State } from "@types";
import { connect } from "react-redux";
import { selectors } from "../../reducer";
import { words } from "../../utility";
import CustomSelect from "./Custom";

const mapStateToProps = (state: State) => ({
  data        : selectors.getCountiesSorted(state),
  label       : words.County,
  isImmutable : true,
  nameKey     : "Name",
  valueKey    : "Short",
});

export default connect(mapStateToProps)(CustomSelect);
