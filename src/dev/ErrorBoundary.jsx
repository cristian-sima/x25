// @flow

type ErrorBoundaryProps = {
  error?: any;
  status?: string;
  children: any;
}

type ErrorBoundaryState = {
  status?: string;
  error: any;
  info: string;
}

import React from "react";

import TheError from "./TheError";

const
  refreshKeyCode = 82,
  timeoutDelay = 200;

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {

  props: ErrorBoundaryProps;
  state: ErrorBoundaryState;

  handleKey: (event : KeyboardEvent) => void;
  refresh: () => void;

  componentDidCatch (error, info) {
    this.setState({
      error,
      info,
    });
  }

  constructor (props : ErrorBoundaryProps) {
    super(props);

    this.state = {
      status : null,
      error  : this.error,
      info   : this.info,
    };

    this.handleKey = (event : KeyboardEvent) => {
      if (event.keyCode === refreshKeyCode) {
        this.refresh();
      }
    };

    this.refresh = () => {
      this.setState({
        status : "Trying to recover...",
        error  : null,
        info   : "",
      }, () => {
        setTimeout(() => {
          this.setState({
            status : null,
            error  : null,
            info   : "",
          });
        }, timeoutDelay);
      });

    };
  }

  shouldComponentUpdate () {
    return (
      true
    );
  }

  render () {
    const { info, error, status } = this.state;

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
