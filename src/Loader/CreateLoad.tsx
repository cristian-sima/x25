import React from "react";

type PropTypes = {
  readonly children: any;
};

import { useDispatch, useSelector } from "react-redux";
import { createAsyncThunk } from "@reduxjs/toolkit";
import superagent from "superagent";
import { words } from "../utility";
import { LargeErrorMessage, LoadingMessage } from "../Messages";

export type CreateGenericOptions = {
  url: string;
  normalizeResult: (response : any) => any;
  reducerName: string;
}

export type LoadGenericDataOptions = CreateGenericOptions & {
  selectors: any;
}

const
  createLoadGenericData = ({ reducerName, url, selectors, normalizeResult }: LoadGenericDataOptions) => {
    const
      createAction = createAsyncThunk(reducerName, async () => {
        const
          response = await superagent.
            get(url).
            type("json");

        return normalizeResult(response);
      },
      ) as any,
      Worker = (props: PropTypes) => {
        const
          { children } = props,
          shouldFetch = useSelector(selectors.shouldFetch),
          isFetching = useSelector(selectors.isFetching),
          hasError = useSelector(selectors.hasError),

          dispatch = useDispatch(),
          performFetch = () => {
            dispatch(createAction());
          };

        React.useEffect(() => {
          if (shouldFetch) {
            performFetch();
          }
        }, [shouldFetch, hasError, isFetching]);

        if (hasError) {
          return <LargeErrorMessage message={words.ThereWasAProblem} onRetry={performFetch} />;
        }

        if (isFetching) {
          return <LoadingMessage message={words.LoadingData} />;
        }

        return children;
      };

    return Worker;
  };

export default createLoadGenericData;
