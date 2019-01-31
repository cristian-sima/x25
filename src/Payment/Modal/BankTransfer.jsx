// @flow

import React from "react";
import { SimpleModal } from "../../Modal";

import { getDetails, info } from "../util";

import { numberToLocale } from "../../utility";

import DoneForm from "./DoneForm";

type BankTransferPropTypes = {
  application: string;
  options: any;
};

class BankTransfer extends React.Component<BankTransferPropTypes> {
  props: BankTransferPropTypes;

  constructor (props: BankTransferPropTypes) {
    super(props);

    this.state = {
      done: false,
    };

    this.transferIsDone = () => {
      this.setState({
        done: true,
      });
    };
  }

  shouldComponentUpdate () {
    return (
      true
    );
  }

  render () {
    const { application, options } = this.props;

    const details = getDetails(application, options);

    if (this.state.done) {
      return <DoneForm details={details} />;
    }

    return (
      <React.Fragment>
        <div>
          {"Te rugăm să operezi următorul transfer bancar."}
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-lg-8 offset-lg-2 card">
              <div className="container card-body">
                <div className="row">
                  <div className="col-md-4 text-md-right">{"Către"}</div>
                  <div className="col-md-8 font-weight-bold">{info.to}</div>
                </div>
                <div className="row">
                  <div className="col-md-4 text-md-right">{""}</div>
                  <div className="col-md-8 small">
                    {`C.I.F. ${info.cif} și Reg. Com. ${info.regCom}`}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 text-md-right">{"Din"}</div>
                  <div className="col-md-8 small">{info.address}</div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-md-4 text-md-right">{"Numele băncii"}</div>
                  <div className="col-md-8">{info.bankName}</div>
                </div>
                <div className="row">
                  <div className="col-md-4 text-md-right">{"IBAN"}</div>
                  <div className="col-md-8 font-weight-bold">{info.bankAccount}</div>
                </div>
                <div className="row">
                  <div className="col-md-4 text-md-right">{"Suma"}</div>
                  <div className="col-md-8 font-weight-bold">
                    {numberToLocale(options.amount)}{" lei"}
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-4 text-md-right">{"Referință"}</div>
                  <div className="col-md-8 font-weight-bold">
                    <code>{details}</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="alert alert-warning mt-3">
          <i className="fa fa-exclamation-circle mr-1" />
          {"Este foarte important să scrii cu atenție câmpul \"Referință\""}
        </div>
        <div className="mt-4">
          {"După ce ai efectuat transferul bancar, apasă următorul buton:"}
        </div>
        <button
          className="btn btn-block btn-primary mt-4 mr-1 ml-1 mb-3"
          onClick={this.transferIsDone}
          type="button">
          <i className="fa fa-check mr-1" />
          {"Am efectuat transferul bancar"}
        </button>
      </React.Fragment>
    );
  }
}


const ModalBankTransfer = (props) => (
  <SimpleModal size="lg" title="Transfer bancar">
    <BankTransfer {...props} />
  </SimpleModal>
);


// <div className="mt-3">
//   <h5>{"Cât timp va dura?"}</h5>
//   <div>
//     {`Durează între 1 și 3 zile lucrătoare pentru operațiunea bancară să
//   se . În momentul în care am primit banii în cont, te rugăm să acorzi
//   1-2 zile lucrătoare să operăm modificările pe platforma Sidework și să
//   te bucuri de beneficii.`}
//   </div>
// </div>

export default ModalBankTransfer;
