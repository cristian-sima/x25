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

import words from "./words";

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
      <div>{words.ItLoadsSlower}
        <button
          className="btn btn-primary btn-block"
          onClick={retry} type="button">{words.TryAgain}
        </button>
      </div>
    );
  }

  return (
    <div className="mt-3">
      <LoadingMessage message={words.PleaseWait} />
    </div>
  );
};

export default RouteLoading;
