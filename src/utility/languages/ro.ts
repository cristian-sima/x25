/* eslint-disable max-len */

const DateFormat = "DD.MM.YEAR";

export const
  romanian = {
    Showing     : "Se afișează",
    All         : "tot",
    Of          : "din",
    LoadingData : "Se încarcă...",
    LoadMore    : "Încarcă mai mult",

    IfThisIsErrorPersist        : "Dacă eroarea persistă, vă rugăm să navigați la ",
    ThisPage                    : "această pagină",
    PleaseWait                  : "Vă rugăm asteptați...",
    TryAgain                    : "Încearcă din nou",
    ThereWasAProblem            : "A apărut o problemă. Încercați din nou",
    NoErrorPassed               : "Niciun ErrorBoundary transmis la x25",
    ItLoadsSlower               : "Se pare că se încarcă mai lent ca de obicei. Vă rugăm să așteptați...",
    TryingToRecover             : "Încerc să-mi revin...",
    SomethingIsNotImmutable     : "Ceva nu este imuabil. verificați consola",
    // header
    ConnectionLost              : "Am pierdut conexiunea la server. Încercați din nou.",
    Options                     : "Opțiuni",
    TermsAndConditions          : "Termeni si conditii",
    PrivacyPolicy               : "Politica de Confidențialitate",
    SelectCompany               : "Selectați compania",
    Toggle                      : "Comută",
    Settings                    : "Setări",
    RenewSubscription           : "Reînnoiește abonamentul",
    TheSubscriptionWillExpireIn : "Abonamentul va expira în",
    SignOut                     : "Deconectează-mă",
    NoOptions                   : "Fără opțiuni",
    // inputs
    BankAccount                 : "Cont bancar",
    BankName                    : "Numele băncii",
    FiscalID                    : "ID fiscal",
    GetDataFromInternet         : "Obținerea datelor de pe internet",
    EnterAValidFiscalID         : "Vă rugăm să introduceți un act de identitate fiscal valid",
    PersonalID                  : "ID personal",
    County                      : "județ",
    Select                      : "Selectați",
    CaptchaDescription          : "Scopul acestei verificări este de a distinge o persoană de un robot. Acest cod apare de obicei atunci când o funcție din aplicație este suprautilizată",
    CaptchaTypeNumbers          : "Tastați numerele din imaginea de mai jos",
    CaptchaVerify               : "Verificare",
    DateFormat,
    ErrorNeverExisted           : "Este posibil să fi fost șters sau să nu fi existat niciodată",
    ErrorConnection             : "Se pare că există o problemă cu serverul dvs. sau conexiunea dvs. la internet a fost întreruptă.",
    Sentry                      : {
      TellUs: {
        title          : "Se pare că avem o problemă",
        subtitle       : "Echipa noastră a fost anunțată",
        subtitle2      : "Dacă vrei să ne ajuți, spune-ne mai jos ce s-a întâmplat. Ne va ajuta foarte mult",
        labelName      : "Numele dumneavoastră",
        labelEmail     : "E-mail",
        labelComments  : "Ce s-a întâmplat?",
        labelClose     : "Închide",
        labelSubmit    : "Trimite",
        errorGeneric   : "A apărut o eroare necunoscută la trimiterea raportului Vă rugăm să încercați din nou",
        errorFormEntry : "Unele câmpuri au fost nevalide. Vă rugăm să corectați erorile și să încercați din nou.",
        successMessage : "Feedback-ul dvs. a fost trimis. Mulțumesc!",
      },
      Message : "Acest mesaj apare atunci când programul a eșuat și nu a reușit să se recupereze. Administratorul a fost anunțat automat despre această problemă. Tot ce trebuie să facem este să ne cerem scuze.",
      Button  : "Spune-ne",
      Hint    : "Sfat: Încercați să reîmprospătați pagina - apăsați tasta",
    },
    // validation
    PleaseSelect          : "Te rog selecteaza",
    EnterValidPersonalID  : "Introduceți un ID personal valid",
    EnterValidFiscalID    : "Introduceți un ID fiscal valid",
    EnterValidBankAccount : "Introduceți un cont bancar valid",
    EnterValidEmail       : "Introduceți un e-mail valid",
    EnterValidDate        : `Introduceți o dată validă (${DateFormat})`,
    NumberBetween         : "între",
    NumberAnd             : "și",
    NumberUpTo            : "pâna la",
    NumberGreaterThan     : "mai mult decat",
    NumberMustBe          : "Trebuie sa fie un numar",
    NumberInteger         : "întreg",
    NumberFloat           : "număr cu virgulă",
    Chars                 : "caractere",
    Has                   : "are",
    TheField              : "Campul",
    Has6Digits            : "Codul are 6 cifre",
    CodeNotValid          : "Codul nu este valid",
    AddARow               : "Adăugați cel puțin un rând",
    message               : {
      failPerform   : "Nu am putut îndeplini sarcina",
      confirmDelete : "Am șters cu succes",
      confirmAdd    : "Adăugat cu succes",
      confirmUpdate : "Date actualizate",
    },
    label: {
      modify       : "Modifica",
      add          : "Adăuga",
      remove       : "Șterge",
      confirmation : "A confirma",
      cancel       : "Anulare",
    },
    Month: {
      0  : "Ianuarie",
      1  : "Februarie",
      2  : "Martie",
      3  : "Aprilie",
      4  : "Mai",
      5  : "Iunie",
      6  : "Iulie",
      7  : "August",
      8  : "Septembrie",
      9  : "Octombrie",
      10 : "Noiembrie",
      11 : "Decembrie",
    },
    getNumberTense: (value: number) => String(value),
  };