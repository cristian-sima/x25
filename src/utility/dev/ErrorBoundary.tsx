

type ErrorBoundaryProps = {
  readonly error?: ErrorType;
  readonly status?: InfoType;
  readonly children: any;
  readonly info?: string;
};
type ErrorBoundaryState = {
  status: string | null | undefined;
  error: ErrorType | null | undefined;
  info: InfoType | null | undefined;
};
import React from "react";
import { words } from "..";
import TheError from "./TheError";
import type { ErrorType, InfoType } from "./types";

const refreshKeyCode = 82,
  timeoutDelay = 200;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  handleKey: (event: KeyboardEvent) => void;
  refresh: () => void;

  componentDidCatch (error: ErrorType, info: InfoType) {
    this.setState({
      error,
      info,
    });
  }

  constructor (props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      status : null,
      error  : null,
      info   : null,
    };

    this.handleKey = (event: KeyboardEvent) => {
      if (event.keyCode === refreshKeyCode) {
        this.refresh();
      }
    };

    this.refresh = () => {
      this.setState({
        status : words.TryingToRecover,
        error  : null,
        info   : null,
      }, () => {
        setTimeout(() => {
          this.setState({
            status : null,
            error  : null,
            info   : null,
          });
        }, timeoutDelay);
      });
    };
  }

  render () {
    const {
      info,
      error,
      status,
    } = this.state;

    // render fallback UI
    if (error) {
      return (
        <TheError
          error={error}
          handleKey={this.handleKey}
          info={info}
          refresh={this.refresh}
          status={status}
        />
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }

}

export default ErrorBoundary;
