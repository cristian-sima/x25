import React from "react";
import { Field } from "react-final-form";
import { normalize, words } from "../../";
import OldCustomSelect from "./Custom";
import OldSimpleCustomSelect from "./Simple";

const
  { normalizeSelectNumeric } = normalize,
  { years, months  } = words,
  SelectMonth = (props: any) => (
    <Field
      {...props}
      component={props.simple ? OldSimpleCustomSelect : OldCustomSelect}
      data={months} normalize={normalizeSelectNumeric}
    />
  ),
  SelectYear = (props: any) => (
    <Field
      {...props}
      component={props.simple ? OldSimpleCustomSelect : OldCustomSelect}
      data={years}
      normalize={normalizeSelectNumeric} />
  );

export { OldCustomSelect as CustomSelect, SelectMonth, SelectYear, OldSimpleCustomSelect as SimpleCustomSelect };

