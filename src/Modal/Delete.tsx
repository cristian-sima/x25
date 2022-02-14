/* eslint-disable handle-callback-err, react/forbid-component-props, no-console */
import type { Dispatch } from "src/types";

type onConfirmMethodsTypes = {
  startPerforming: () => void;
  endPerforming: (cb: any) => void;
  closeModal: () => void;
};


type ConfirmStateTypes = {
  isPerforming: boolean;
};
import React, { MouseEventHandler } from "react";
import { connect } from "react-redux";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { words } from "../utility";

const { message: languageMessage, label } = words;

import * as x25Actions from "../actions";
import * as actions from "./actions";

const
  mapProps = () => ({
    errMessage         : languageMessage.failPerform,
    title              : label.confirmation,
    cancelButtonLabel  : label.cancel,
    confirmButtonColor : "danger",
    confirmButtonLabel : label.remove,
    focusButton        : true,
    isResponseValid    : (response: any) => ({
      valid : response === "",
      error : response,
    }),
  }),
  mapDispatchToProps = (dispatch: Dispatch) => ({
    closeModal () {
      dispatch(actions.hideModal());
    },

    showError (errMessage : any) {
      dispatch(x25Actions.notifyError(errMessage));
    },
  });

  type ConfirmPropTypes = {
    readonly errMessage?: string;
    readonly title?: string;
    readonly confirmButtonColor?:string;
    readonly cancelButtonLabel: string | null | undefined;
    readonly confirmButtonLabel: string | null | undefined;
    readonly message: any;
    readonly focusButton: boolean;
    readonly onConfirm: (methods: onConfirmMethodsTypes) => () => void;
    readonly closeModal: () => void;
    readonly showError: (message?: string) => void;
    readonly request: () => Promise<any>;
    readonly onSuccess: (response: any) => void;
    readonly isResponseValid: (response: any) => {
      valid: boolean;
      error: string;
    };
  };

class Confirm extends React.Component<ConfirmPropTypes, ConfirmStateTypes> {

  state: ConfirmStateTypes;
  field: any;
  endPerforming: (cb? : any) => void;
  handleConfirmation: MouseEventHandler<HTMLButtonElement>;
  handleConfirmButton: (node: any) => void;
  startPerforming: (cb? : any) => void;
  focusConfirmButton: () => any;

  constructor (props: ConfirmPropTypes) {
    super(props);
    const that = this;

    this.state = {
      isPerforming: false,
    };

    this.handleConfirmButton = (node: any) => {
      this.field = node;
    };

    this.focusConfirmButton = () => setTimeout(() => {
      const {
        focusButton,
      } = this.props;

      if (focusButton) {
        setTimeout(() => {
          const {
            field,
          } = this;

          if (field && field !== null) {
            field.focus();
          }
        });
      }
    });

    this.startPerforming = (cb?: any) => {
      this.setState({
        isPerforming: true,
      }, cb);
    };

    this.endPerforming = (cb?: any) => this.setState({
      isPerforming: false,
    }, () => {
      /* eslint-disable callback-return */
      that.focusConfirmButton();

      if (typeof cb === "function") {
        cb();
      }
    });

    const {
      startPerforming,
      endPerforming,
    } = this;

    this.handleConfirmation = () => {
      const {
        request,
        onSuccess,
        closeModal,
        errMessage,
        showError,
        isResponseValid,
      } = this.props;

      startPerforming(() => {
        request().then((response: string) => {
          const {
            valid,
            error,
          } = isResponseValid(response);

          if (valid) {
            closeModal();
            onSuccess(response);
          } else {
            endPerforming();
            showError(error);
          }
        }).
          catch((exception : any) => {
            endPerforming();
            showError(errMessage);
            // eslint-disable
            console.log("exception", exception);
          });
      });
    };
  }

  componentDidMount () {
    this.focusConfirmButton();
  }

  shouldComponentUpdate (nextProps: ConfirmPropTypes, nextState: ConfirmStateTypes) {
    return (
      this.props.cancelButtonLabel !== nextProps.cancelButtonLabel ||
      this.props.confirmButtonLabel !== nextProps.confirmButtonLabel ||
      this.props.focusButton !== nextProps.focusButton ||
      this.props.title !== nextProps.title ||
      this.props.confirmButtonColor !== nextProps.confirmButtonColor ||
      this.state.isPerforming !== nextState.isPerforming
    );
  }

  render () {
    const
      { isPerforming } = this.state,
      {
        cancelButtonLabel,
        confirmButtonLabel,
        message,
        title,
        confirmButtonColor,
        closeModal,
      } = this.props,

      getConfirmButtonText = () => {
        if (isPerforming) {
          return (
            <span>
              <i className="fa fa-refresh fa-spin fa-fw" />
              {` ${words.PleaseWait}`}
            </span>
          );
        }

        return confirmButtonLabel;
      };

    return (
      <Modal autoFocus={!this.props.focusButton} isOpen toggle={closeModal} zIndex="1061">
        <ModalHeader toggle={closeModal}>
          {title}
        </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button className="me-1" color="secondary" onClick={closeModal}>
            {cancelButtonLabel}
          </Button>
          <button
            className={`btn ${confirmButtonColor ? `btn-${confirmButtonColor}` : ""}`}
            disabled={isPerforming}
            onClick={this.handleConfirmation}
            ref={this.handleConfirmButton}
            type="button">
            {getConfirmButtonText()}
          </button>
        </ModalFooter>
      </Modal>
    );
  }

}

export default connect(null, mapDispatchToProps, mapProps)(Confirm);
