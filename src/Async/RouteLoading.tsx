type LoadingPropTypes = {
  readonly error?: any;
  readonly timedOut: boolean;
  readonly pastDelay: boolean;
  readonly retry: () => void;
};
import React from "react";
import { LoadingMessage } from "../Messages/Loading";
import { words } from "../utility";
import { ErrorBoundary } from "./index";

const

  // type FireErrorPropTypes = {
  //   error: any;
  // };
  // import SimulatedException from "./SimulatedException";
  // IgnoreThisNode = ({
  //     error: {
  //       message,
  //       stack,
  //     },
  //   }: FireErrorPropTypes) => {
  //     throw new SimulatedException(message, stack);
  //   },


  // <ErrorBoundary>
  // <IgnoreThisNode error={error} />
  // </ErrorBoundary>


  RouteLoading = ({
    error,
    retry,
    timedOut,
  }: LoadingPropTypes) => {
    if (error) {
      return (
        <ErrorBoundary />
      );
    }

    if (timedOut) {
      return (
        <div>{words.ItLoadsSlower}
          <button className="btn btn-primary btn-block" onClick={retry} type="button">
            {words.TryAgain}
          </button>
        </div>
      );
    }

    return (
      <div className="mt-3">
        <LoadingMessage message={words.PleaseWait} />
      </div
      >);
  };

export default RouteLoading;
