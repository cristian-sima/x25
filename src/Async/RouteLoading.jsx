// @flow

type LoadingPropTypes = {
  error?: string;
  retry: () => void;
  timedOut: bool;
  pastDelay: bool;
}

import React from "react";

import { LoadingMessage } from "../Messages/Loading";

const FireError = (error) => {
  throw error;
};

import { ErrorBoundary } from "./index";

const RouteLoading = ({ error, retry, timedOut } : LoadingPropTypes) => {
  if (error) {
    return (
      <ErrorBoundary>
        <FireError error={error} />
      </ErrorBoundary>
    );
  } else if (timedOut) {
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
