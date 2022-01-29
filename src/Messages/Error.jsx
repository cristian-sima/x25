// @flow

type ErrorMessageProps = {
  +message: string;
  +details?: string;
  +itemNotFound?: boolean;

  +onRetry?: () => void;
};


import React from "react";

import words from "../words";

export const ErrorMessage = ({ message, onRetry } : ErrorMessageProps) => (
  <div className="container alert alert-warning">
    <div className="row">
      <div className="col-2 col-sm-1">
        <i className="fa fa-exclamation-triangle fa-2x" />
      </div>
      <div className="col-7 col-sm-8">
        <h5>
          {message}
        </h5>
      </div>
      <div className="col-3 col-sm-3 text-right">
        {
          (typeof onRetry === "undefined") ? null : (
            <button
              className="btn btn-primary btn-sm"
              onClick={onRetry}
              type="button">
              <span className="hidden-sm-down">
                {words.TryAgain}
              </span>
              <span className="visible-up d-md-none">
                <i className="fa fa-refresh" />
              </span>
            </button>
          )
        }
      </div>
    </div>
  </div>
);

export const LargeErrorMessage = ({ message, onRetry, details, itemNotFound } : ErrorMessageProps) => (
  <div className="container mt-5" >
    <div className="row">
      <div className="offset-md-1 offset-xl-2 col-md-2 col-xl-1 text-warning text-center">
        <i className="fa fa-exclamation-triangle fa-5x" />
      </div>
      <div className="col-md-8 col-xl-5">
        <h3>
          {message}
        </h3>
        <div className="mt-3 text-muted">
          {
            itemNotFound ? words.ErrorNeverExisted : (
              details || words.ErrorConnection
            )
          }
        </div>
        <div className="text-right mt-3">
          {
            (typeof onRetry === "undefined") ? null : (
              <button
                className="btn btn-primary"
                onClick={onRetry}
                type="button">
                {words.TryAgain}
              </button>
            )
          }
        </div>
      </div>
    </div>
  </div>
);
