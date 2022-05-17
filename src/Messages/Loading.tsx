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

      return message;
    };

  if (isSmall) {
    return (
      <div className={`text-center ${className || ""} mb-1`}>
        <div className="font-weight-bold d-inline align-middle">
          {getMessage()}
        </div>
        <div className="loading-sm d-inline-block align-middle"><div /><div /><div /><div /></div>
      </div>
    );
  }

  return (
    <div className={`text-center my-4 ${className || ""}`}>
      <div className="spinner-border text-primary" role="status">
        <span className="sr-only">{words.LoadingData}</span>
      </div>
      <div className="text-fancy mt-1">{message}</div>
    </div>
  );
};
