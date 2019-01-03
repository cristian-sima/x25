// @flow
/* globals process */
/* eslint-disable vars-on-top, max-len, global-require, no-process-env */

import { setFavIconToDev } from "Intern/utility/others";

const init = () => {
  if (process.env.NODE_ENV === "production") {
    const Sentry = require("@sentry/browser");

    Sentry.init({
      dsn: "https://3dfd3739fdae49c1a5ec195f1e367320@sentry.io/1357047",
      beforeSend (event) {
      // Check if it is an exception, if so, show the report dialog
        if (event.exception) {
          Sentry.showReportDialog({
            title          : "Se pare că avem probleme.",
            subtitle       : "Echipa noastră a fost anunțată.",
            subtitle2      : "Dacă doriți să ne ajutați, spuneți-ne ce sa întâmplat mai jos.",
            labelName      : "Numele dvs.",
            labelEmail     : "Adresa de e-mail",
            labelComments  : "Ce s-a întâmplat?",
            labelClose     : "Închide",
            labelSubmit    : "Trimite",
            errorGeneric   : "A apărut o eroare necunoscută la trimiterea raportului dvs. Vă rugăm să încercați din nou.",
            errorFormEntry : "Unele câmpuri au fost nevalide. Corectați erorile și încercați din nou.",
            successMessage : "Feedback-ul dvs. a fost trimis. Mulțumesc!",
          });
        }
        return event;
      },
    });
  } else {
    setTimeout(() => {
      setFavIconToDev();
    });
  }
};

export default init;
