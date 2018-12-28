// @flow

import agent from "superagent";

import { withPromiseCallback } from "../../utility";

export const logOut = () => (
  new Promise((resolve, reject) => (
    agent.
      post("/api/account/logout").
      type("form").
      end(withPromiseCallback(resolve, reject))
  )) : Promise<any>
);
