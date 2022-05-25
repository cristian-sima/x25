
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError } from "../actions";
import { words } from "../utility";
import { ConfirmationModalProps, FooterProps } from "./types";
import { ModalWindow } from ".";


type ModalFooterProps = FooterProps & {
  readonly tryToClose: () => any;
}

const ModalFooter = (props : ModalFooterProps) => {
    const
      { message: languageMessage, label } = words,

      dispatch = useDispatch(),
      {
        cancelButtonLabel = label.cancel,
        confirmButtonLabel = label.remove,
        errMessage = languageMessage.failPerform,

        isResponseValid = (response: any) => ({
          valid : response === "",
          error : response,
        }),

        confirmButtonColor = "danger",

        showError = (msg : any) => {
          dispatch(notifyError(msg));
        },
      } = props,

      [isPerforming, setIsPerforming] = useState(false),

      endPerforming = (cb?: any) => {
        setIsPerforming(false);

        if (typeof cb === "function") {
          cb();
        }
      },

      handleConfirmation = () => {
        const { request, onSuccess, tryToClose } = props;

        setIsPerforming(true);

        request().
          then((response: string) => {
            const {
              valid,
              error,
            } = isResponseValid(response);

            if (valid) {
              tryToClose();
              onSuccess(response);
            } else {
              endPerforming();
              showError(error);
            }
          }).
          catch((exception : any) => {
            endPerforming();
            showError(errMessage);
            // eslint-disable-next-line no-console
            console.log("exception", exception);
          });
      };

    return (
      <div className="modal-footer">
        <button className="btn btn-secondary me-1" onClick={props.tryToClose} type="button">
          {cancelButtonLabel}
        </button>
        <button
          autoFocus={props.focusButton}
          className={`btn ${confirmButtonColor ? `btn-${confirmButtonColor}` : ""}`}
          disabled={isPerforming}
          onClick={handleConfirmation}
          type="button">
          {
            isPerforming ? (
              <span>
                <i className="fa fa-refresh fa-spin fa-fw" />
                {` ${words.PleaseWait}`}
              </span>
            ) : confirmButtonLabel
          }
        </button>
      </div>
    );
  },
  ConfirmationModal = (props : ConfirmationModalProps) => (
    <ModalWindow
      {...props}
      Footer={ModalFooter}
      title={props.title ? props.title : "Confirmation"}>
      <div>
        {props.footerProps.message}
      </div>
    </ModalWindow>
  );

export default ConfirmationModal;
