import classnames from "classnames";
import React, { useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch } from "react-redux";
import { hideModal } from "./actions";
import { FOCUSABLE_SELECTOR, trapFocus } from "./focusTrap";
import GlobalModalContext from "./GlobalModalContext";
import {
  isModalHistoryEntryCurrent,
  isTopModalWindow,
  popModalHistoryEntry,
  pushModalHistoryEntry,
  registerModalWindow,
  setModalWindowGlobal,
  unregisterModalWindow,
} from "./modalStack";
import { ModalWindowProps } from "./types";

const
  ENTER_DELAY = 150,
  EXIT_DELAY = 150,
  BASE_Z_INDEX = 1055,
  Z_INDEX_STEP = 20,

  ModalWindow = (props : ModalWindowProps) => {
    const {
        size = "",
        Footer,
        Header,
        stackIndex = 0,
      } = props,


      [show, setShow] = useState(false),

      bodyRef = useRef<HTMLDivElement>(null),
      dialogRef = useRef<HTMLDivElement>(null),
      enterTimeoutRef = useRef<number>(0),
      exitTimeoutRef = useRef<number>(0),
      isClosingRef = useRef(false),
      isClosedByBackRef = useRef(false),
      previousFocusRef = useRef<HTMLElement | null>(null),
      mouseDownTargetRef = useRef<EventTarget | null>(null),
      propsRef = useRef(props),

      titleId = useId(),

      isGlobalContext = useContext(GlobalModalContext),

      dispatch = useDispatch();

    propsRef.current = props;

    const tryToClose = useCallback((cb? : () => void) => {
      if (isClosingRef.current) {
        return;
      }
      isClosingRef.current = true;

      if (enterTimeoutRef.current) {
        window.clearTimeout(enterTimeoutRef.current);
        enterTimeoutRef.current = 0;
      }
      if (exitTimeoutRef.current) {
        window.clearTimeout(exitTimeoutRef.current);
      }

      setShow(false);

      exitTimeoutRef.current = window.setTimeout(() => {
        const
          latest = propsRef.current,
          shouldHideModal = isGlobalContext && !latest.preventDispatchHideModal;

        if (shouldHideModal) {
          dispatch(hideModal());
        }
        if (typeof latest.onClose === "function") {
          latest.onClose();
        }
        if (typeof cb === "function") {
          cb();
        }
      }, EXIT_DELAY);
    }, [dispatch, isGlobalContext]);

    useEffect(() => {
      const
        dialogNode = dialogRef.current,
        isLocal = !isGlobalContext || Boolean(propsRef.current.preventDispatchHideModal),
        handleBack = () => {
          const isBlocked = isClosingRef.current || Boolean(propsRef.current.doNotCloseByBack);

          if (isBlocked) {
            return false;
          }

          isClosedByBackRef.current = true;
          tryToClose();

          return true;
        };

      if (dialogNode) {
        registerModalWindow(dialogNode, handleBack);

        if (!isLocal) {
          setModalWindowGlobal(dialogNode);
        }
      }

      if (isLocal) {
        pushModalHistoryEntry();
      }

      previousFocusRef.current = document.activeElement as HTMLElement | null;

      enterTimeoutRef.current = window.setTimeout(() => {
        setShow(true);

        if (dialogRef.current) {
          const alreadyFocused = dialogRef.current.contains(document.activeElement);

          if (!alreadyFocused) {
            const target = dialogRef.current.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);

            (target || dialogRef.current).focus();
          }
        }
      }, ENTER_DELAY);

      return () => {
        if (enterTimeoutRef.current) {
          window.clearTimeout(enterTimeoutRef.current);
        }
        if (exitTimeoutRef.current) {
          window.clearTimeout(exitTimeoutRef.current);
        }

        if (dialogNode) {
          unregisterModalWindow(dialogNode);
        }

        const shouldPopHistory = isLocal && !isClosedByBackRef.current;

        if (shouldPopHistory && isModalHistoryEntryCurrent()) {
          popModalHistoryEntry();
        }

        const previous = previousFocusRef.current;

        if (previous && typeof previous.focus === "function" && document.contains(previous)) {
          window.setTimeout(() => {
            previous.focus();
          }, 0);
        }
      };
    }, [isGlobalContext, tryToClose]);

    useEffect(() => {
      const handleMouseDown = (event : MouseEvent) => {
          mouseDownTargetRef.current = event.target;
        },

        handleMouseUp = (event : MouseEvent) => {
          const downTarget = mouseDownTargetRef.current;

          mouseDownTargetRef.current = null;

          if (downTarget !== event.target) {
            return;
          }
          if (!bodyRef.current || !dialogRef.current) {
            return;
          }

          const
            target = event.target as Node,
            inBackdrop = bodyRef.current.contains(target),
            inDialog = dialogRef.current.contains(target);

          if (inBackdrop && !inDialog) {
            tryToClose();
          }
        };

      document.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }, [tryToClose]);

    useEffect(() => {
      const handleKeyDown = (event : KeyboardEvent) => {
        if (!isTopModalWindow(dialogRef.current)) {
          return;
        }

        if (event.key === "Escape" && !propsRef.current.doNotCloseByEscape) {
          tryToClose();

          return;
        }

        if (event.key === "Tab" && dialogRef.current) {
          trapFocus(event, dialogRef.current);
        }
      };

      document.addEventListener("keydown", handleKeyDown, false);

      return () => {
        document.removeEventListener("keydown", handleKeyDown, false);
      };
    }, [tryToClose]);

    useEffect(() => {
      if (props.pleaseClose) {
        tryToClose();
      }
    }, [props.pleaseClose, tryToClose]);

    const
      zIndex = BASE_Z_INDEX + (stackIndex * Z_INDEX_STEP),
      dialogClass = classnames("modal-dialog", { [`modal-${size}`]: size });

    return createPortal(
      <GlobalModalContext.Provider value={false}>
        <div
          aria-labelledby={titleId}
          aria-modal="true"
          className={classnames("modal", "fade", "d-block", { show })}
          ref={bodyRef}
          role="dialog"
          style={{
            background: "rgb(0 0 0 / 45%)",
            zIndex,
          }}>
          <div
            className={dialogClass}
            ref={dialogRef}
            role="document"
            tabIndex={-1}>
            <div className="modal-content">
              {
                props.customContent ? (
                  React.cloneElement(props.children, { tryToClose })
                ) : (
                  <>
                    <div className="modal-header">
                      {
                        typeof Header === "undefined" ? (
                          <h5 className="modal-title" id={titleId}>
                            {props.title}
                          </h5>
                        ) : (
                          <Header
                            {...props.headerProps}
                            title={props.title}
                            titleId={titleId}
                            tryToClose={tryToClose}
                          />
                        )
                      }
                      <button
                        aria-label="Close"
                        className="btn btn-link ms-auto"
                        onClick={() => tryToClose()}
                        type="button">
                        <i aria-hidden="true" className="fa fa-times" />
                      </button>
                    </div>
                    <div className="modal-body">
                      {
                        props.doNoPassTryToCloseToBody ? props.children : React.cloneElement(props.children, { tryToClose })
                      }
                    </div>
                  </>
                )
              }
              {
                typeof Footer === "undefined" ? null : (
                  <Footer {...props.footerProps} tryToClose={tryToClose} />
                )
              }
            </div>
          </div>
        </div>
      </GlobalModalContext.Provider>,
      document.body,
    );
  };

export default ModalWindow;
