// @flow

import * as Immutable from "immutable";

import { LOCATION_CHANGE } from "react-router-redux";

const initialState = Immutable.Map({
  locationBeforeTransitions: null,
});

export default (state : any = initialState, action : any) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set("locationBeforeTransitions", Immutable.Map(action.payload));
  }

  return state;
};
