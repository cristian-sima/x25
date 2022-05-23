
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { notifyError } from "src/actions";
import { words } from "src/utility";
import { FooterProps, ModalWindowProps } from "./types";
import { ModalWindow } from ".";

type ConfirmationModalProps = ModalWindowProps & {
    footerProps: FooterProps
}

const ModalFooter = (props : FooterProps) => {
    const
      { message: languageMessage, label } = words,
      {
        cancelButtonLabel = label.cancel,
        errMessage = languageMessage.failPerform,
        confirmButtonLabel = label.remove,

        isResponseValid = (response: any) => ({
          valid : response === "",
          error : response,
        }),

        confirmButtonColor = "danger",
      } = props,

      [isPerforming, setIsPerforming] = useState(false),

      dispatch = useDispatch(),
      showError = (msg : any) => {
        dispatch(notifyError(msg));
      },

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
      Footer={ModalFooter}>
      {props.children}
    </ModalWindow>
  );

export default ConfirmationModal;
