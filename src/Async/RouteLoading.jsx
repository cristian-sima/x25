// @flow

type LoadingPropTypes = {
  error?: string;
  retry: () => void;
  timedOut: bool;
  pastDelay: bool;
}

import React from "react";

import { LoadingMessage } from "../Messages/Loading";

const RouteLoading = (props : LoadingPropTypes) => {
  if (props.error) {
    return (
      <div>
        {"Se pare că a apărut o eroare! "}
        <button
          className="btn btn-primary btn-block"
          onClick={props.retry} type="button">{"Încearcă din nou"}
        </button>
      </div>
    );
  } else if (props.timedOut) {
    return (
      <div>{"Se pare că se încarcă mai greu ca de obicei "}
        <button
          className="btn btn-primary btn-block"
          onClick={props.retry} type="button">{"Încearcă din nou"}
        </button>
      </div>
    );
  }
  return (
    <div className="mt-3">
      <LoadingMessage message="Așteaptă un pic..." />
    </div>
  );
};

export default RouteLoading;
