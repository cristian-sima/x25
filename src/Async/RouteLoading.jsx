// @flow

type LoadingPropTypes = {
  +error?: any;
  +timedOut: bool;
  +pastDelay: bool;
  +retry: () => void;
}

type FireErrorPropTypes = {
  error: any;
}

import React from "react";

import { LoadingMessage } from "../Messages/Loading";
import SimulatedException from "./SimulatedException";

import { ErrorBoundary } from "./index";

const IgnoreThisNode = ({ error : { message, stack } } : FireErrorPropTypes) => {
  throw new SimulatedException(message, stack);
};

const RouteLoading = ({ error, retry, timedOut } : LoadingPropTypes) => {
  if (error) {
    return (
      <ErrorBoundary>
        <IgnoreThisNode error={error} />
      </ErrorBoundary>
    );
  }

  if (timedOut) {
    return (
      <div>{"Se pare că se încarcă mai greu ca de obicei "}
        <button
          className="btn btn-primary btn-block"
          onClick={retry} type="button">{"Încearcă din nou"}
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
