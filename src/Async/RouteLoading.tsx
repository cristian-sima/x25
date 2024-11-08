type LoadingPropTypes = {
  readonly error?: any;
  readonly timedOut: boolean;
  readonly pastDelay: boolean;
  readonly retry: () => any;
};
import React from "react";
import { LoadingMessage } from "../Messages/Loading";
import { UpdateApplicationMessage } from "../Messages/Update";
import { words } from "../utility";
import TheError from "../utility/dev/TheError";
import SimulatedException from "./SimulatedException";

const
  RouteLoading = ({ error : theError, retry, pastDelay, timedOut }: LoadingPropTypes) => {
    if (theError) {

      if (theError.name === "ChunkLoadError") {
        return (
          <UpdateApplicationMessage />
        );
      }

      // eslint-disable-next-line no-undef
      if (process.env.NODE_ENV === "development") {
        return (
          <TheError
            error={theError}
            refresh={retry}
          />
        );
      }

      throw new SimulatedException(theError);
    } else if (timedOut) {
      return (
        <div>{words.ItLoadsSlower}
          <button
            className="btn btn-primary btn-block"
            onClick={retry} type="button">{words.TryAgain}
          </button>
        </div>
      );
    } else if (pastDelay) {
      // When the loader has taken longer than the delay
      return (
        <div className="mt-3">
          <LoadingMessage message={words.PleaseWait} />
        </div>
      );
    }

    // When the loader has just started
    return null;

    // if (error) {
    //   return (
    //     <ErrorBoundary />
    //   );
    // }

    // if (timedOut) {
    //   return (
    //     <div>{words.ItLoadsSlower}
    //       <button className="btn btn-primary btn-block" onClick={retry} type="button">
    //         {words.TryAgain}
    //       </button>
    //     </div>
    //   );
    // }

    // return (
    //   <div className="mt-3">
    //     <LoadingMessage message={words.PleaseWait} />
    //   </div>
    //   )
  };

export default RouteLoading;
