
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError } from "../actions";
import { words } from "../utility";
import ModalWindow from "./ModalWindow";
import { ConfirmationModalProps, FooterProps } from "./types";


type ModalFooterProps = FooterProps & {
  readonly tryToClose: (cb? : any) => any;
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
        const { request, onSuccess, tryToClose, onBeforeSuccessClosing } = props;

        setIsPerforming(true);

        request().
          then((possibleResponse : any) => {
            const
              theResponse = possibleResponse.response ? possibleResponse.response : possibleResponse,
              { body } = theResponse,
              { valid, error } = isResponseValid(body);

            if (typeof onBeforeSuccessClosing === "function") {
              onBeforeSuccessClosing(body);
            }

            if (valid) {
              tryToClose(() => {
                if (typeof onSuccess === "function") {
                  onSuccess(body);
                }
              });
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
        <button
          className="btn btn-secondary me-1"
          disabled={isPerforming}
          onClick={props.tryToClose}
          type="button">
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
      doNoPassTryToCloseToBody
      {...props}
      Footer={ModalFooter}
      title={props.title ? props.title : words.Confirmation}>
      <div>
        {props.footerProps.message}
      </div>
    </ModalWindow>
  );

export default ConfirmationModal;
