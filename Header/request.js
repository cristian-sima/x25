// @flow

import agent from "superagent";

import { withPromiseCallback } from "utility/normalize";

export const logOut = () => (
  new Promise((resolve, reject) => (
    agent.
      post("/api/extern/logout").
      type("form").
      end(withPromiseCallback(resolve, reject))
  )) : Promise<any>
);
