import React from "react";
import { connect } from "react-redux";
import { LargeErrorMessage, LoadingMessage } from "../Messages";
import type { Dispatch, State } from "../types";
import { words } from "../utility";
import { fetchInitialInformation as fetchInitialInformationAction } from "./actions";
import { selectors } from "./reducer";

type PropTypes = {
  readonly appName: string;
  readonly isFetching: boolean;
  readonly hasError: boolean;
  readonly data: any;
  readonly children: any;
  readonly shouldFetch: any;
  readonly fetchInitialInformation: () => void;
};

const mapStateToProps = (state: State) => ({
    data        : selectors.getCurrentAccount(state),
    hasError    : selectors.getCurrentAccountHasError(state),
    fetched     : selectors.getCurrentAccountIsFetched(state),
    isFetching  : selectors.getCurrentAccountIsFetching(state),
    shouldFetch : selectors.getCurrentAccountShouldFetch(state),
  }),
  mapDispatchToProps = (dispatch: Dispatch, {
    appName,
  } : { appName : string }) => ({
    fetchInitialInformation () {
      setTimeout(() => {
        dispatch(fetchInitialInformationAction(appName));
      });
    },

  }),

  LoadAccount = (props: PropTypes) => {
    const { children, data, isFetching, shouldFetch, hasError, fetchInitialInformation } = props;

    React.useEffect(() => {
      if (shouldFetch) {
        fetchInitialInformation();
      }
    }, [shouldFetch, isFetching, hasError]);

    if (isFetching) {
      return <LoadingMessage message={words.PleaseWait} />;
    }

    if (hasError) {
      return <LargeErrorMessage message={words.ThereWasAProblem} onRetry={fetchInitialInformation} />;
    }

    if (data.size === 0) {
      return null;
    }

    return children;
  };

export default connect(mapStateToProps, mapDispatchToProps)(LoadAccount);
