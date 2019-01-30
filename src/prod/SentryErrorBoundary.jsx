// @flow

type ErrorBoundaryPropTypes = {
  children: any;
};

type ErrorBoundaryStateTypes = {
  erorr?: any;
}

import * as Sentry from "@sentry/browser";

import React from "react";

class ErrorBoundary extends React.Component<ErrorBoundaryPropTypes, ErrorBoundaryStateTypes> {

  props: ErrorBoundaryPropTypes;
  state: ErrorBoundaryStateTypes;

  componentDidCatch (error, errorInfo) {
    this.setState({ error });

    Sentry.withScope((scope : any) => {
      Object.keys(errorInfo).forEach((key) => {
        scope.setExtra(key, errorInfo[key]);
      });
      Sentry.captureException(error);
    });
  }

  tellUs: () => void;

  constructor (props) {
    super(props);
    this.state = { error: null };

    this.tellUs = () => Sentry.showReportDialog({
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

  render () {
    if (this.state.error) {
      // render fallback UI
      return (
        <div className="jumbotron">
          <h1 className="display-4">{"Hrmm... Ceva nu a mers cum trebuia"}</h1>
          <p className="lead">
            {`Acest mesaj apare când programul a avut o eroare și nu a mai reușit
          să îți revină. Administratorul a fost informat automat despre
          această problemă. Nu avem decât să ne cerem scuze.`}
          </p>
          <hr className="my-4" />
          <p>
            {"Ne-ar fi de mare folos pentru remedierea erori, decă ne-ai "}
            <button
              className="btn btn-primary text-link"
              onClick={this.tellUs} type="button">
              {"spune ce s-a întâmplat"}
            </button>
          </p>
          <hr />
          <p>
            {"Sfat: Încearcă să re-împrospătezi pagina (apasă tasta "}
            <kbd>{"F5"}</kbd>
            {" pe sistemul windows, sau "}
            <kbd>{"CMD"}</kbd>
            {" și "}
            <kbd>{"R"}</kbd>
          </p>
        </div>
      );
    }

    // when there's not an error, render children untouched
    return this.props.children;
  }
}

export default ErrorBoundary;
