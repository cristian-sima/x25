import React from "react";
import { connect } from "react-redux";
import Notifications from "react-notification-system-redux2";
import ModalRoot from "../Modal/Root";
import { getNotificationState } from "../config";
import { deleteNotification } from "../actions";
import type { Dispatch, State } from "src/types";

const
  mapStateToProps = (state: State) => ({
    notifications: getNotificationState(state) || [],
  }),
  mapDispatchToProps = (dispatch: Dispatch) => ({
    handleDismiss: (notification : { key : number }) => {
      dispatch(deleteNotification(notification.key));
    },
  }),

  NotificationsContainer = connect(mapStateToProps, mapDispatchToProps)(Notifications),

  Things = () => (
    <>
      <div className="d-print-none">
        <NotificationsContainer />
      </div>
      <ModalRoot />
    </>
  );

export default Things;
