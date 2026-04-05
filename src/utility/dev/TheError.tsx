

type TheErrorProps = {
  readonly error: ErrorType | null | undefined;
  readonly handleKey?: (event: KeyboardEvent) => void;
  readonly info?: InfoType | null | undefined;
  readonly status?: string | null | undefined;
  readonly refresh: () => any;
};

import React from "react";
import { words } from "..";
import type { ErrorType, InfoType } from "./types";

const isDev = process.env.NODE_ENV === "development",

  TheError = (props: TheErrorProps) => {
    React.useEffect(() => {
      if (props.handleKey) {
        document.addEventListener("keydown", props.handleKey);
      }
      return () => {
        if (props.handleKey) {
          document.removeEventListener("keydown", props.handleKey);
        }
      };
    }, []);

    const { error, info, status, refresh } = props;

    if (status) {
      return (
        <div className="small" tabIndex={0}>
          <div className="m-2">
            <div className="text-fancy">{words.TryingToRecover}</div>
          </div>
        </div>
      );
    }

    if (!isDev) {
      return (
        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="text-center">
                <div className="alert alert-warning">
                  <h5 className="mb-3">{words.Sentry.TellUs.title}</h5>
                  <p>{words.Sentry.Message}</p>
                  <p className="small text-muted mb-3">
                    {words.Sentry.Hint}
                    {" "}
                    <kbd>{"F5"}</kbd>
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => window.location.reload()}
                    type="button">
                    {words.UpdateButton}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Development mode - show full technical details
    return (
      <div className="small" tabIndex={0}>
        <div className=" m-2">
          <div>
            <button className="btn btn-block btn-sm btn-primary" onClick={refresh} type="button">
              {"Recover the app"}
            </button>
            <div className="mt-2 mb-2">
              {"Press  "}
              <kbd>{"R"}</kbd>
              {" to recover the app, after you've done the changes"}
            </div>
            <hr />
            {error ? (
              <>
                <h5 className="text-danger">{error.message}</h5>
                <b>{"Stack:"}</b>
                <pre>
                  {error.stack ? (
                    error.stack.split("↵").map((line, index) => (
                      <div key={index}>{line}</div>
                    ))
                  ) : null}
                </pre>
              </>
            ) : null}
            <br />
            {info && info.componentStack ? (
              <>
                <b>{"React info:"}</b>
                <pre>
                  {info.componentStack.split("↵").map((line, index) => <div key={index}>{line}</div>)}
                </pre>
              </>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

export default TheError;
