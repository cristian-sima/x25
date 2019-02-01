// @flow

import type { ErrorType, InfoType } from "./types";

type TheErrorProps = {
  error: ?ErrorType;
  info: ?InfoType;
  status: ?string;
  refresh: () => void;
  handleKey: (event : KeyboardEvent) => void;
}

import React from "react";

class TheError extends React.Component<TheErrorProps> {

  componentWillMount () {
    document.addEventListener("keydown", this.props.handleKey);
  }

  componentWillUnmount () {
    document.removeEventListener("keydown", this.props.handleKey);
  }

  render () {
    const { error, info, status, refresh } = this.props;

    // render fallback UI
    return (
      <div className="small" tabIndex="0">
        <div className=" m-2">
          {
            status ? (
              <div className="text-fancy">{"Trying to recover app..."}</div>
            ) : (
              <div>
                <button
                  className="btn btn-block btn-sm btn-primary"
                  onClick={refresh} type="button">
                  {"Recover the app"}
                </button>
                <div className="mt-2 mb-2">
                  {"Press  "}
                  <kbd>{"R"}</kbd>
                  {" to recover the app, after you've done the changes"}
                </div>
                <hr />
                {
                  error ? (
                    <React.Fragment>
                      <h5 className="text-danger">{error.message}</h5>
                      <b>{"Stack:"}</b>
                      <pre>
                        {
                          error.stack ? (
                            error.stack.split("↵").map((line, index) => (
                              <div key={index}>{line}</div>
                            ))
                          ) : null
                        }
                      </pre>
                    </React.Fragment>
                  ) : null
                }
                <br />
                {
                  info && info.componentStack ? (
                    <React.Fragment>
                      <b>{"React info:"}</b>
                      <pre>
                        {
                          info.componentStack.split("↵").map((line, index) => (
                            <div key={index}>{line}</div>
                          ))
                        }
                      </pre>
                    </React.Fragment>
                  ) : null
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

export default TheError;
