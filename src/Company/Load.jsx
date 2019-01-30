// @flow
/* eslint-disable react/require-optimization */

import type { Dispatch, State } from "src/types";

type PrivateRoutePropTypes = {
  isFetching: bool;
  hasError: bool;
  data: any;
  shouldFetch: any;
  children: any;

  fetchCurrentCompany: () => void;
}

import React from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { selectors } from "./reducer";

import { fetchCurrentCompany as fetchCurrentCompanyAction } from "./actions";

import { LargeErrorMessage, LoadingMessage } from "../Messages";

const
  mapStateToProps = (state : State) => ({
    data        : selectors.getCurrentCompany(state),
    hasError    : selectors.getCurrentCompanyHasError(state),
    fetched     : selectors.getCurrentCompanyIsFetched(state),
    isFetching  : selectors.getCurrentCompanyIsFetching(state),
    shouldFetch : selectors.getCurrentCompanyShouldFetch(state),
  }),
  mapDispatchToProps = (dispatch : Dispatch, { match : { params : { company } } }) => ({
    fetchCurrentCompany () {
      dispatch(fetchCurrentCompanyAction(company));
    },
  });

class PrivateRoute extends React.Component<PrivateRoutePropTypes> {
  props: PrivateRoutePropTypes;

  componentWillMount () {
    const { shouldFetch, fetchCurrentCompany } = this.props;

    if (shouldFetch) {
      fetchCurrentCompany();
    }
  }

  render () {
    const { isFetching, hasError, fetchCurrentCompany, data, children } = this.props;

    if (isFetching) {
      return (
        <LoadingMessage message="Așteaptă..." />
      );
    }

    if (hasError) {
      return (
        <LargeErrorMessage
          message="Nu am putut stabili conexiunea cu server-ul"
          onRetry={fetchCurrentCompany}
        />
      );
    }

    if (data.size === 0) {
      return null;
    }

    return (
      <React.Fragment>
        {children}
      </React.Fragment>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
