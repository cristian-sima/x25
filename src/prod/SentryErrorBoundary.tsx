
type Props = {
  readonly error?: ErrorType;
  readonly children: any;
  readonly info?: string;
};
type State = {
  error: ErrorType | null | undefined;
};

import * as Sentry from "@sentry/browser";
import React from "react";
import type { InfoType, ErrorType } from "../dev/types";
import { words } from "../utility";

class ErrorBoundary extends React.Component<Props, State> {
  componentDidCatch (error: ErrorType, errorInfo: InfoType) {
    this.setState({
      error,
    });
    Sentry.withScope((scope: any) => {
      Object.keys(errorInfo).forEach((key) => {
        // @ts-expect-error I do not know
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  tellUs: () => void;

  constructor (props: Props) {
    super(props);
    this.state = {
      error: null,
    };

    this.tellUs = () => Sentry.showReportDialog(words.Sentry.TellUs);
  }

  render () {
    if (this.state.error) {
      // render fallback UI
      return (
        <div className="jumbotron">
          <h1 className="display-4">{words.Sentry.TellUs.title}</h1>
          <p className="lead">
            {words.Sentry.Message}
          </p>
          <hr className="my-4" />
          <p>
            {words.Sentry.TellUs.subtitle2}
            <button className="btn btn-primary text-link" onClick={this.tellUs} type="button">
              {words.Sentry.Button}
            </button>
          </p>
          <hr />
          <p>
            {words.Sentry.Hint}
            <ul>
              <li><kbd>{"F5"}</kbd>{" Windows"}</li>
              <br />
              <li><kbd>{"CMD"}</kbd>{"  "}
                <kbd>{"R"}</kbd>{" MAC"}
              </li>
            </ul>
          </p>
        </div>
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }

}

export default ErrorBoundary;
