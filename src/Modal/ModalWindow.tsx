import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "./actions";
import { ModalWindowProps } from "./types";

const ModalWindow = (props : ModalWindowProps) => {
  const
    delay = 150,
    { size = "", Footer, Header } = props,

    [show, setShow] = useState(false),
    [waitingToClose, setWaitingToClose] = useState(false),

    [enterTimeout, setEnterTimeout] = useState(0),
    [exitTimeout, setExitTimeout] = useState(0),

    bodyRef : any = useRef(null),
    dialogRef : any = useRef(null),

    dispatch = useDispatch(),

    tryToClose = (cbTryToClose? : any) => {
      const
        closeModal = () => {
          if (!props.preventDispatchHideModal) {
            dispatch(hideModal());
          }

          if (typeof props.onClose === "function") {
            props.onClose();
          }

          if (typeof cbTryToClose === "function") {
            cbTryToClose();
          }
        };

      clearTimeout(enterTimeout);
      clearTimeout(exitTimeout);

      setWaitingToClose(true);
      setShow(false);

      const theExit : any = setTimeout(() => {
        closeModal();
      }, delay);

      setExitTimeout(theExit);
    };

  useEffect(() => {
    const handleClickOutside = (event : MouseEvent) => {
      const isClickOutsideButNotOnButton = (
        bodyRef.current && bodyRef.current.contains(event.target) &&
          !dialogRef.current.contains(event.target)
      );

      if (isClickOutsideButNotOnButton) {
        tryToClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [bodyRef]);

  useEffect(() => {
    const keyPressed = (event : KeyboardEvent) => {
      if (event.key === "Escape" && !props.doNotCloseByEscape) {
        tryToClose();
      }
    };

    if (!props.doNotCloseByEscape) {
      document.addEventListener("keydown", keyPressed, false);
    }

    return () => {
      if (!props.doNotCloseByEscape) {
        document.removeEventListener("keydown", keyPressed, false);
      }
    };
  }, [!props.doNotCloseByEscape]);


  useEffect(() => {
    if (!show && !waitingToClose) {

      const theEnter : any = setTimeout(() => {
        setShow(true);
      }, delay);

      setEnterTimeout(theEnter);
    }

  }, [show, waitingToClose]);

  useEffect(() => () => {
    clearTimeout(enterTimeout);
    clearTimeout(exitTimeout);
  });

  return (
    <div
      className={`modal fade d-block ${show ? "show" : ""}`}
      ref={bodyRef}
      style={{
        background: "rgb(0 0 0 / 45%)",
      }}>
      <div className={`modal-dialog modal-${size}`} ref={dialogRef} role="document">
        <div className="modal-content">
          <div className="modal-header">
            {
              typeof Header === "undefined" ? (
                <h5 className="modal-title">
                  {props.title}
                </h5>
              ) : (
                <Header title={props.title} {...props.headerProps} tryToClose={tryToClose} />
              )
            }
            <button
              aria-label="Close"
              className="btn btn-link"
              data-dismiss="modal"
              onClick={tryToClose}
              type="button">
              <i className="fa fa-times" />
            </button>
          </div>
          <div className="modal-body">
            {
              props.doNoPassTryToCloseToBody ? props.children : React.cloneElement(props.children, { tryToClose })
            }
          </div>
          {
            typeof Footer === "undefined" ? null : (
              <Footer {...props.footerProps} tryToClose={tryToClose} />
            )
          }
        </div>
      </div>
    </div>
  );
};


export default ModalWindow;


