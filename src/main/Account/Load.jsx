// @flow
/* eslint-disable react/require-optimization */

import type { Dispatch, State } from "src/types";

type PrivateRoutePropTypes = {
  isFetching: bool;
  hasError: bool;
  data: any;
  children: any;
  shouldFetch: any;

  fetchInitialInformation: () => void;
}

import React, { Fragment } from "react";

import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { selectors } from "./reducer";

import { fetchInitialInformation as fetchInitialInformationAction } from "./actions";

import { LargeErrorMessage, LoadingMessage } from "../Messages";

import { delay } from "../../utility";

const
  mapStateToProps = (state : State) => ({
    data        : selectors.getInitialInformation(state),
    hasError    : selectors.getInitialInformationHasError(state),
    fetched     : selectors.getInitialInformationIsFetched(state),
    isFetching  : selectors.getInitialInformationIsFetching(state),
    shouldFetch : selectors.getInitialInformationShouldFetch(state),
  }),
  mapDispatchToProps = (dispatch : Dispatch) => ({
    fetchInitialInformation () {
      delay().
        then(() => {
          dispatch(fetchInitialInformationAction());
        });
    },
  });

class PrivateRoute extends React.Component<PrivateRoutePropTypes> {
  props: PrivateRoutePropTypes;

  componentWillMount () {
    const { shouldFetch, fetchInitialInformation } = this.props;

    if (shouldFetch) {
      fetchInitialInformation();
    }
  }

  render () {
    const { children, data, isFetching, hasError, fetchInitialInformation } = this.props;

    if (isFetching) {
      return (
        <LoadingMessage message="Așteaptă..." />
      );
    }

    if (hasError) {
      return (
        <LargeErrorMessage
          message="Nu am putut stabili conexiunea cu server-ul"
          onRetry={fetchInitialInformation}
        />
      );
    }

    if (data.size === 0) {
      return null;
    }

    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PrivateRoute));
