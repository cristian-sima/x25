import React from "react";
import { Field } from "react-final-form";
import { months, normalizeSelectNumeric, years } from "../../utility";
import OldCustomSelect from "./Custom";
import OldSimpleCustomSelect from "./Simple";

const
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

