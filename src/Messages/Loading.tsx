type LoadingMessagePropTypes = {
  readonly className?: string;
  readonly message?: string;
  readonly sm?: boolean;
};
import React from "react";
import { words } from "../utility";

export const LoadingMessage = ({
  message,
  sm,
  className,
}: LoadingMessagePropTypes) => {
  const isSmall = sm === true,

    getMessage = () => {
      if (message === "") {
        return null;
      }

      return (
        <div className="font-weight-bold d-inline align-middle">
          {message}
        </div>
      );
    };

  if (isSmall) {
    return (
      <div className={`d-flex justify-content-center ${className || ""} mb-1`}>
        <div className="align-self-center">
          {getMessage()}
        </div>
        <div className="align-self-center">
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="visually-hidden">{words.LoadingData}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center my-4 ${className || ""}`}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">{words.LoadingData}</span>
      </div>
      {
        message ? (
          <div className="text-fancy mt-1">{message}</div>
        ) : null
      }
    </div>
  );
};
