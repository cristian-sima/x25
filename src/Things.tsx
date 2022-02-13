import React from "react";
import type { Dispatch, State } from "types";
import { connect } from "react-redux";
import Notifications from "react-notification-system-redux2";
import ModalRoot from "./Modal/Root";
import { deleteNotification } from "./actions";

const mapStateToProps = (state: State) => ({
    notifications: state.get("notifications", []),
  }),
  mapDispatchToProps = (dispatch: Dispatch) => ({
    handleDismiss: (notification) => {
      dispatch(deleteNotification(notification.key));
    },
  }),

  NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(Notifications),

  Things = () => (<React.Fragment>
    <div className="d-print-none">
      <NotificationsContainer />
    </div>
    <ModalRoot />
  </React.Fragment>);

export default Things;