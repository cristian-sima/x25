import type { Action } from "src/types";
import Notifications from "react-notification-system-redux2";

type NotificationOptions = {
  title: string;
  position: "tr" | "tl" | "tc" | "br" | "bl" | "bc";
  autoDismiss: number;
}

type CreateNotification = (
  (level : string) => (title : string | JSX.Element, options?: NotificationOptions) => Action
);

const
  createNotification : CreateNotification = (level) => (title, options) => Notifications.show({
    title,
    position    : "tc",
    autoDismiss : 5,
    ...options,
  }, level);

export const
  notify = createNotification("success"),
  notifyWarning = createNotification("warning"),
  notifyError = createNotification("error"),
  deleteNotification = (position: number): Action => ({
    type    : "DELETE_NOTIFICATION",
    payload : position,
  }),

  // captcha

  showCaptcha = (payload: {
  id: string;
  name: string;
}): Action => ({
    type: "SHOW_CAPTCHA",
    payload,
  }),
  hideCaptcha = (payload: string): Action => ({
    type: "HIDE_CAPTCHA",
    payload,
  });

export * from "./Modal/actions";
export * from "./Account/actions";
