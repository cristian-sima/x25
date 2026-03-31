import { toast } from "react-toastify";
import type { Action } from "src/types";

type NotificationOptions = {
  seconds?: number;
  persistent?: boolean;
}

const
  autoDismissDelay = 6,
  msPerSecond = 1000,
  toMs = (sec: number) => sec * msPerSecond,
  createNotification = (level: "success" | "warning" | "error") =>
    (title: string | JSX.Element, options?: NotificationOptions) => {
      const autoClose = options?.persistent ? false : toMs(options?.seconds ?? autoDismissDelay);

      toast(title, {
        type     : level,
        position : "top-center",
        autoClose,
      });

      // Return a no-op action for Redux dispatch compatibility
      return { type: "NOTIFICATION_SHOWN" } as Action;
    };

export const
  notify = createNotification("success"),
  notifyWarning = createNotification("warning"),
  notifyError = createNotification("error"),

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

export * from "./Account/actions";
export * from "./Modal/actions";

