

import React, { useState } from "react";
import { ModalWindow } from "../../Modal";
import { numberToLocale } from "../../utility";
import { SIDEWORK_APPLICATION } from "../core/codes";
import { sideworkCompanyInfo as info } from "../core/util/info";
import { getDetails } from "../core/util/util";
import BankTransferFormWrapper from "../Pieces/BankTransferForm/BankTransferFormWrapper";


type PaymentBankTransferProps = {
  readonly application: SIDEWORK_APPLICATION;
  readonly options: any;
  readonly info : any;
};

const 
  PaymentBankTransfer = ({ application, options }: PaymentBankTransferProps) => {
    const [done, setDone] = useState(false),
      details = getDetails(application, options),

      transferIsDone = () => {
        setDone(true);
      };

    if (done) {
      return <BankTransferFormWrapper details={details} />;
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-xl">
            <h4>
              {"Pasul "}
              <span className="badge text-bg-primary rounded-circle">1</span>
            </h4>
            <div className="text-muted">{"Te rugăm să operezi următorul transfer bancar."}</div>
            <div className="container mt-3">
              <div className="row">
                <div className="col-lg card">
                  <div className="container card-body">
                    <div className="row">
                      <div className="col-md-4 text-md-right">{"Către"}</div>
                      <div className="col-md-8 fw-bold">{info.to}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 text-md-right">{""}</div>
                      <div className="col-md-8 small">
                        {`C.I.F. ${info.cif} și Reg. Com. ${info.regCom}`}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 text-md-right text-muted">{"Din"}</div>
                      <div className="col-md-8 small text-muted">{info.address}</div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-md-4 text-md-right">{"Numele băncii"}</div>
                      <div className="col-md-8">{info.bankName}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 text-md-right">{"IBAN"}</div>
                      <div className="col-md-8 fw-bold">{info.bankAccount}</div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 text-md-right">{"Suma"}</div>
                      <div className="col-md-8 fw-bold">
                        {numberToLocale(options.amount)}{" lei"}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4 text-md-right">{"Referință"}</div>
                      <div className="col-md-8 fw-bold">
                        <code>{details}</code>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="alert alert-warning mt-3">
              <i className="fa fa-exclamation-circle me-1" />
              {"Este foarte important să scrii cu atenție câmpul \"Referință\""}
            </div>
          </div>
          <div className="col-xl">
            <h4>
              {"Pasul "}
              <span className="badge text-bg-primary rounded-circle">2</span>
            </h4>
            <div className="mt-4">
              {"După ce ai efectuat transferul bancar, apasă următorul buton:"}
            </div>
            <div className="text-center">
              <button
                className="btn btn-block btn-primary mt-4 me-1 ms-1 mb-3"
                onClick={transferIsDone}
                type="button">
                <i className="fa fa-check me-1" />
                {"Am efectuat transferul bancar"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },

  PaymentBankTransferModal = (props: PaymentBankTransferProps) => (
    <ModalWindow size="xl" title="Transfer bancar">
      <PaymentBankTransfer {...props} />
    </ModalWindow>
  );

export default PaymentBankTransferModal;
