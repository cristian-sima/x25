// @flow
/* globals process */
/* eslint-disable vars-on-top, max-len, global-require, no-process-env */

export const setFavIconToDev = () => {
  const element : any = document.querySelector("link[rel*='icon");

  if (element !== null && element.href) {
    element.href = "/static/dev.ico";
  }
};

const perform = (configuration) => {
  if (process.env.NODE_ENV === "production") {
    const Sentry = require("@sentry/browser");

    Sentry.init(configuration.sentry);
  } else {
    setTimeout(() => {
      setFavIconToDev();
    });
  }
};

export default perform;
