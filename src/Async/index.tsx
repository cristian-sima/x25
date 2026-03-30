/* eslint-disable new-cap, react/prefer-stateless-function, react/require-optimization */
import * as React from "react";
import { LoadingMessage } from "../Messages/Loading";
import { UpdateApplicationMessage } from "../Messages/Update";
import { words } from "../utility";
import TheError from "../utility/dev/TheError";
import InitModule from "./InitModule";
import SimulatedException from "./SimulatedException";
import type { Loaded } from "./types";

export let ErrorBoundary = ({ children } : any) => (
  children
);

export let AppLogo : any = null;

type AsyncErrorBoundaryState = {
  error: Error | null;
};

class AsyncErrorBoundary extends React.Component<
{ children: React.ReactNode },
AsyncErrorBoundaryState
> {
  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  state: AsyncErrorBoundaryState = { error: null };

  render() {
    const { error } = this.state;

    if (error) {
      if (error.name === "ChunkLoadError") {
        return <UpdateApplicationMessage />;
      }

      // eslint-disable-next-line no-undef
      if (process.env.NODE_ENV === "development") {
        return (
          <TheError
            error={error}
            refresh={() => this.setState({ error: null })}
          />
        );
      }

      throw new SimulatedException(error);
    }

    return this.props.children;
  }
}

const LoadingFallback = () => (
  <div className="mt-3">
    <LoadingMessage message={words.PleaseWait} />
  </div>
);

export const
  setErrorBoundary = (theError: any) => {
    ErrorBoundary = theError;
  },
  setAppLogo = (theLogo: any) => {
    AppLogo = theLogo;
  },
  createAsyncRoute = (loader : () => Promise<Loaded>) => {
    const LazyComponent = React.lazy(() =>
        loader().then((loaded) => ({
          // eslint-disable-next-line func-name-matching
          default: function AsyncRouteInit(props : any) {
            return <InitModule loaded={loaded} props={props} />;
          },
        })),
      ),

      AsyncRoute = (props : any) => (
        <AsyncErrorBoundary>
          <React.Suspense fallback={<LoadingFallback />}>
            <LazyComponent {...props} />
          </React.Suspense>
        </AsyncErrorBoundary>
      );

    return AsyncRoute;
  };
