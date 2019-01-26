// @flow

import React from "react";
import { components } from "react-select";

export const noOptionsMessage = () => "Nu există opțiuni";
export const loadingMessage = () => "Se încarcă...";

export const Option = (props) => (
  <div className="text-truncate small" title={props.label}>
    <components.Option {...props} />
  </div>
);

export const isSmall = () => window.matchMedia("(max-width: 780px)").matches;

export const wrapperClassname = "search-bar mr-md-1 mb-2 md-mb-0 d-block d-md-inline-block";


export const getDefaultCompanyRoute = ({ Modules, ID } : { Modules : string, ID : number }) => {
  const getModule = () => {
    const
      modules = String(Modules),
      parts = modules.split(",");

    if (modules === "") {
      return "info";
    }

    const [first] = parts;

    if (first === "employees") {
      return first;
    }

    return `${first}/list`;
  };

  return `/company/${ID}/${getModule()}`;
};
