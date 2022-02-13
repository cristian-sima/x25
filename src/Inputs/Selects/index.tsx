import { Field } from "redux-form/immutable";
import React from "react";
import { months, years, normalizeSelectNumeric } from "../../utility";
import SelectCounty from "./County";
import CustomSelect from "./Custom";
import SimpleCustomSelect from "./Simple";

const SelectMonth = (props: any) => <Field {...props} component={props.simple ? SimpleCustomSelect : CustomSelect} data={months} normalize={normalizeSelectNumeric} />,

  SelectYear = (props: any) => <Field {...props} component={props.simple ? SimpleCustomSelect : CustomSelect} data={years} normalize={normalizeSelectNumeric} />;

export { SelectMonth, SelectYear, SelectCounty, CustomSelect, SimpleCustomSelect };
