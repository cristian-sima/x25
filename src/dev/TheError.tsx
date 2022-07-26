

type TheErrorProps = {
  readonly error: ErrorType | null | undefined;
  readonly handleKey?: (event: KeyboardEvent) => void;
  readonly info?: InfoType | null | undefined;
  readonly status?: string | null | undefined;
  readonly refresh: () => any;
};

import React from "react";
import type { ErrorType, InfoType } from "./types";

const TheError = (props: TheErrorProps) => {
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

  const {    error,    info,    status,    refresh,  } = props;

  // render fallback UI
  return (
    <div className="small" tabIndex={0}>
      <div className=" m-2">
        {status ? (
          <div className="text-fancy">{"Trying to recover app..."}</div>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default TheError;
