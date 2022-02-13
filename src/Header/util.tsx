import type { CompanyRoutePropTypes } from "./types";

type OptionsPropTypes = {
  readonly label: string;
  readonly options: any;
  readonly clearValue: any;
  readonly innerProps: any;
  readonly hasValue: any;
  readonly isDisabled: any;
  readonly selectOption: any;
  readonly cx: any;
  readonly isFocused: any;
  readonly isMulti: any;
  readonly isSelected: any;
  readonly selectProps: any;
  readonly getValue: any;
  readonly innerRef: any;
  readonly data: any;
  readonly children: any;
  readonly getStyles: any;
  readonly theme: any;
  readonly type: any;
  readonly setValue: any;
};
import React from "react";
import { components } from "react-select";
import { words } from "../utility";

export const noOptionsMessage = () => words.NoOptions;
export const loadingMessage = () => words.PleaseWait;
export const Option = (props: OptionsPropTypes) => (<div className="text-truncate small" title={props.label}>
  <components.Option {...props} />
</div>);
export const isSmall = () => window.matchMedia("(max-width: 780px)").matches;
export const wrapperClassname = "search-bar me-md-1 mb-2 md-mb-0 d-block d-md-inline-block";
export const getDefaultCompanyRoute = ({
  Modules,
  ID,
}: CompanyRoutePropTypes) => {
  const getModule = () => {
    const modules = String(Modules),
      parts = modules.split(",");

    if (modules === "") {
      return "info";
    }

    const [first] = parts;

    return `${first}/list`;
  };

  return `/company/${ID}/${getModule()}`;
};
