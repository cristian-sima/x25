
import Immutable from "immutable";
import React from "react";
import { ImmutableFormError } from "react-immutable-form";
import { onSubmitImmutableFormFunc } from "react-immutable-form/types";
import { useDispatch } from "react-redux";
import superagent from "superagent";
import { hideModal } from "../../../actions";
import { paymentShowBankTransferDoneAction } from "../../core/actions";
import { PaymentBankTransferConfirmForm } from "../../core/types";
import BankTransferForm from "./BankTransferForm";

type BankTransferFormWrapperProps = {
  readonly details: string;
}

const
  BankTransferFormWrapper = (props : BankTransferFormWrapperProps) => {
    const
      dispatch = useDispatch(),
      performModify = () => {
        dispatch(hideModal());
        dispatch(paymentShowBankTransferDoneAction());
      },
      getURL = () => "/api/settings/payments/confirm-bank-transfer",
      onSubmit : onSubmitImmutableFormFunc = async (values: Immutable.Map<string, any>) => {
        const
          formData = values.toJS() as PaymentBankTransferConfirmForm,
          performRequest = () => (
            superagent.
              put(getURL()).
              set("Accept", "application/json").
              send({
                ...formData,
                Details: props.details,
              })
          ),
          { body } = await performRequest();

        if (body.Error !== "") {
          throw new ImmutableFormError(body.Error);
        }

        performModify();
      };

    return (
      <BankTransferForm
        buttonLabel="Finalizează proces"
        onSubmit={onSubmit}
      />
    );
  };

export default BankTransferFormWrapper;

