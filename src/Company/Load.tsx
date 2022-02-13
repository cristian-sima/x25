/* eslint-disable react/require-optimization */
import type { Dispatch, State } from "@types";

type PropTypes = {
  readonly isAdministrator: boolean;
  readonly isFetching: boolean;
  readonly hasError: boolean;
  readonly data: any;
  readonly shouldFetch: any;
  readonly children: any;
  readonly fetchCurrentCompany: () => void;
};
import React from "react";
import { withRouter } from "react-router-dom";
// import moment from "moment";
import { connect } from "react-redux";
import { accountSelectors } from "../Account";
import { LargeErrorMessage, LoadingMessage } from "../Messages";
import { words } from "../utility";
import { fetchCurrentCompany as fetchCurrentCompanyAction } from "./actions";
import { selectors } from "./reducer";

// import EstimatePrice from "../Payment/EstimatePrice";
const mapStateToProps = (state: State) => ({
    isAdministrator : accountSelectors.getIsCurrentAccountAdministrator(state),
    data            : selectors.getCurrentCompany(state),
    hasError        : selectors.getCurrentCompanyHasError(state),
    fetched         : selectors.getCurrentCompanyIsFetched(state),
    isFetching      : selectors.getCurrentCompanyIsFetching(state),
    shouldFetch     : selectors.getCurrentCompanyShouldFetch(state),
  }),
  mapDispatchToProps = (dispatch: Dispatch, {
    match: {
      params: {
        company,
      },
    },
  }) => ({
    fetchCurrentCompany () {
      dispatch(fetchCurrentCompanyAction(company));
    },

  }),

  LoadCompany = (props: PropTypes) => {
    const {
      children,
      data,
      isFetching,
      shouldFetch,
      hasError,
      fetchCurrentCompany,
    } = props;

    React.useEffect(() => {
      if (shouldFetch) {
        fetchCurrentCompany();
      }
    }, [shouldFetch, isFetching, hasError]);

    if (isFetching) {
      return <LoadingMessage message={words.PleaseWait} />;
    }

    if (hasError) {
      return <LargeErrorMessage message={words.ThereWasAProblem} onRetry={fetchCurrentCompany} />;
    }

    if (data.size === 0) {
      return null;
    }

    return children;
  };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoadCompany));
