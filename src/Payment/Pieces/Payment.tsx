
/* eslint-disable no-magic-numbers */

import Immutable from "immutable";
import React from "react";
import { ImmutableFormError } from "react-immutable-form";
import { useDispatch } from "react-redux";
import { paymentPayUsingBankTransferModalAction } from "../core/actions";
import { SIDEWORK_APPLICATION } from "../core/codes";
import { addPayment as addPaymentRequest } from "../core/request";
import type { PaymentBankTransferArgsTypes } from "../core/types";
import { getDetails } from "../core/util/util";
import MobilPayForm from "./MobilPayForm";

type PaymentProps = {
  readonly companyID: number;
  readonly children: any;
  readonly application: SIDEWORK_APPLICATION;
  readonly url?: string;
};

const
  /**
   *   Injects a createPayment method ready for dealing with adding the payment.
  After that, it submits the payment 
  */
  Payment = (props : PaymentProps) => {
    const 
      [ info, setInfo ] = React.useState(Immutable.Map({
        envKey             : "",
        data               : "",
        show3rdServiceForm : false,
      })),  
      dispatch = useDispatch(),
      payUsingBankTransfer = (options : PaymentBankTransferArgsTypes) => () => {
        dispatch(paymentPayUsingBankTransferModalAction(props.application, options));
      },
      createPayment = (rawData : any) => {
        const
          data = rawData.toJS(),
          { companyID } = props,
          Details = getDetails(props.application, {
            ...data,
            companyID,
          }),
          toSend = {
            CompanyID: companyID,
            Details,
          };
  
        return addPaymentRequest(toSend).
          then((response : any) => {
            if (response.Error === "") {
              setInfo(Immutable.Map({
                envKey             : response.EnvKey,
                data               : response.Data,
                show3rdServiceForm : true,
              }));
            } 
          }).
          catch(() => {
            // eslint-disable-next-line no-alert
            throw new ImmutableFormError("Ceva nu a mers cum trebuia");
          });
      },

      { children, companyID } = props;

    if (info.get("show3rdServiceForm")) {
      return (
        <MobilPayForm
          data={info.get("data") as string}
          envKey={info.get("envKey") as string}
        />
      );
    }

    if (children === null) {
      return null;
    }

    return (
      React.cloneElement(children, {
        companyID,
        createPayment,
        payUsingBankTransfer,
      })
    );
  };

export default Payment;