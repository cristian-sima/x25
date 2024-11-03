import Immutable from "immutable";
import React from "react";
import { ImmutableForm } from "react-immutable-form";
import { useOnServerFailed, useOnSubmitWithDispatch } from "react-immutable-form-with-bootstrap";
import { onSubmitImmutableFormFunc } from "react-immutable-form/types";
import BankTransferNumberField from "./BankTransferNumberField";
import validate from "./validate";
import { PaymentBankTransferConfirmForm } from "src/Payment/core/types";
  
type BankTransferFormProps = {
  readonly buttonLabel: string;
  readonly initialValues?: Immutable.Map<string, any>;
  readonly onSubmit: onSubmitImmutableFormFunc;
};

const
  BankTransferForm = (props : BankTransferFormProps) => {
    const
      { buttonLabel, initialValues, onSubmit } = props,
      onSubmitError = useOnSubmitWithDispatch(),
      onServerFailed = useOnServerFailed();
  
    return (
      <ImmutableForm<PaymentBankTransferConfirmForm>
        initialValidators={validate}
        initialValues={initialValues}
        onServerFailed={onServerFailed}
        onSubmit={onSubmit}
        onSubmitError={onSubmitError}>
        {(form) => {
          const
            formError = form.management.get("formError"),
            isSubmitting = form.management.get("isSubmitting"),
            numberInputRef = React.useRef(null as any),
            focusNumberInput = () => numberInputRef?.current?.focus();
    
          React.useEffect(() => {
            focusNumberInput();
          }, []);
    
          return (
            <form autoComplete="off" onSubmit={form.handleSubmit}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-6 offset-lg-3">
                    {formError ? (
                      <div className="alert alert-danger mt-2">
                        {formError}
                      </div>
                    ) : null}
                    
                    <div className="alert alert-primary">
                      {"Te rugăm să completezi numărul tranzacției bancare:"}
                    </div>
                    <div className="container">
                      <div className="row">
                        <div className="col-md">
                          <BankTransferNumberField 
                            inputProps={{
                              ref: numberInputRef,
                            }} 
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-center my-3">
                      <button
                        aria-label={buttonLabel}
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        type="submit">
                        {isSubmitting ? (
                          <span>
                            <i className="fa fa-refresh fa-spin fa-fw" />
                            {" Așteaptă"}
                          </span>
                        ) : `${buttonLabel}`}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          );
        }}
      </ImmutableForm>
    );
  };
  
export default BankTransferForm;

