// @flow

import * as Immutable from "immutable";

import { reducer as notitificationsReducer } from "react-notification-system-redux";

export default (state = Immutable.Map(), action : any) => Immutable.Map({
  notifications: notitificationsReducer(state.get("notifications", []), action),
});
