import { toast } from "react-toastify";
import type { Action } from "src/types";

type NotificationOptions = {
  seconds?: number;
  persistent?: boolean;
}

const
  autoDismissDelay = 6,
  toMs = (sec: number) => sec * 1000,
  createNotification = (level: "success" | "warning" | "error") =>
    (title: string | JSX.Element, options?: NotificationOptions) => {
      const autoClose = options?.persistent ? false : toMs(options?.seconds ?? autoDismissDelay);

      toast(title, {
        type: level,
        position: "bottom-center",
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

