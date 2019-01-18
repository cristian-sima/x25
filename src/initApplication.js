// @flow
/* globals process */
/* eslint-disable  */

export const setFavIconToDev = () => {
  const element : any = document.querySelector("link[rel*='icon");

  if (element !== null && element.href) {
    element.href = "/static/dev.ico";
  }
};

const perform = (configuration) => {
  console.log("process.env.NODE_ENV =", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") {
    const Sentry = require("@sentry/browser");

    Sentry.init({
      ...configuration.sentry,
      beforeSend (event) {
        if (event.exception) {
          Sentry.showReportDialog({
            title     : "Se pare că avem probleme.",
            subtitle  : "Echipa noastră a fost anunțată.",
            subtitle2 : `Dacă doriți să ne ajutați, spuneți-ne ce sa întâmplat mai jos.
            Ne va ajuta foarte mult`,
            labelName     : "Numele dvs.",
            labelEmail    : "Adresa de e-mail",
            labelComments : "Ce s-a întâmplat?",
            labelClose    : "Închide",
            labelSubmit   : "Trimite",
            errorGeneric  : `A apărut o eroare necunoscută la trimiterea raportului
             dvs. Vă rugăm să încercați din nou.`,
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

export default perform;
