// @flow

type ThingsProps = {
  getComponent: (name: string) => void;
}

import React, { Fragment } from "react";

import ModalRoot from "./Modal/Root";

import type { Dispatch, State } from "src/types";

import { connect } from "react-redux";
import Notifications from "react-notification-system-redux";

import { deleteNotification } from "./Notifications/actions";

const
  mapStateToProps = (state : State) => ({
    notifications: state.get("notifications", []),
  }),
  mapDispatchToProps = (dispatch : Dispatch) => ({
    handleDismiss: (notification) => {
      dispatch(deleteNotification(notification.key));
    },
  });

const NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(Notifications);

const Things = ({ getComponent } : ThingsProps) => (
  <Fragment>
    <NotificationsContainer />
    <ModalRoot getComponent={getComponent} />
  </Fragment>
);

export default Things;
