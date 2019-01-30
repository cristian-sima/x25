// @flow

type LoadingPropTypes = {
  error?: any;
  retry: () => void;
  timedOut: bool;
  pastDelay: bool;
}

type FireErrorPropTypes = {
  error: any;
}

import React from "react";

import { LoadingMessage } from "../Messages/Loading";

import { ErrorBoundary } from "./index";

const IgnoreThisNodeInSentry = ({ error } : FireErrorPropTypes) => {
  const message = `There was the following exception: \n\n
    message:\n
    ${error.message} \n\n
    stack: (please ignore the first node) \n
    ${error.stack}
  `;

  throw message;
};

const RouteLoading = ({ error, retry, timedOut } : LoadingPropTypes) => {
  if (error) {
    return (
      <ErrorBoundary>
        <IgnoreThisNodeInSentry error={error} />
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
