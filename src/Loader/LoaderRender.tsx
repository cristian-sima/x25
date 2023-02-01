import React from "react";

type PropTypes = {
  sm?: boolean;
  keepShowingDataIfHasBeenFetched?: boolean;
  readonly children: any;
  token: string;
};

import { createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import superagent from "superagent";
import { ErrorMessage, LargeErrorMessage, LoadingMessage } from "../Messages";
import { words } from "../utility";

export type CreateGenericOptions = {
  url: string | ((token: string) => any);
  normalizeResult: (response : any) => any;
  key: string;
}

export type LoadGenericDataOptions = CreateGenericOptions & {
  selectors: any;
}

const
  createLoadGenericData = ({ key, url, selectors, normalizeResult }: LoadGenericDataOptions) => {
    const
      createAction = createAsyncThunk(key, async (token : string) => {
        const
          response = await (
            superagent.
              get(typeof url === "string" ? url : url(token)).
              type("json")
          );

        return normalizeResult(response);
      },
      ) as any,
      LoaderRender = (props: PropTypes) => {
        const
          { children, token } = props,
          shouldFetch = useSelector((state : any) => selectors.shouldFetch(state, token)),
          isFetching = useSelector((state : any) => selectors.isFetching(state, token)),
          hasError = useSelector((state : any) => selectors.hasError(state, token)),
          hasBeenFetched = useSelector((state : any) => selectors.hasBeenFetched(state, token)),

          doNotShowLoading = props.keepShowingDataIfHasBeenFetched && hasBeenFetched,

          dispatch = useDispatch(),
          performFetch = () => {
            dispatch(createAction(token));
          };

        React.useEffect(() => {
          if (shouldFetch) {
            performFetch();
          }
        }, [shouldFetch, hasError, isFetching]);

        if (!doNotShowLoading && hasError) {
          return (
            props.sm ? (
              <ErrorMessage message={words.ThereWasAProblem} onRetry={performFetch} />
            ) : (
              <LargeErrorMessage message={words.ThereWasAProblem} onRetry={performFetch} />
            )
          );
        }

        if (!doNotShowLoading && isFetching) {
          return <LoadingMessage message={words.LoadingData} sm={props.sm} />;
        }

        return children;
      };

    return LoaderRender;
  };

export default createLoadGenericData;
