

import agent from "superagent";

const normalizePayment = (resolve : any, reject : any) => (
  (error : any, response : any) => {

    if (error) {
      reject({ error });
    } else {
      const { body } = response,
        { Error } = body;

      if (typeof Error !== "undefined" && Error !== "") {
        reject({
          error: Error,
        });
      } else {
        resolve({
          ...body,
          Error,
        });
      }
    }
  }
);

export const addPayment = (data : any) => (
  new Promise((resolve, reject) => (
    agent.
      put("/api/settings/payments").
      set("Accept",
        "application/json").
      send(data).
      end(normalizePayment(resolve,
        reject))
  )) 
);

