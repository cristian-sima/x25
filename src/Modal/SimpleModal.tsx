import type { Dispatch } from "src/types";

type SimpleModalPropTypes = {
  readonly size?: string;
  readonly title: string;
  readonly children: any;
  readonly hideModal?: () => void;
};
import { connect } from "react-redux";
import React from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { delay } from "../utility";
import { hideModal as hideModalAction } from "./actions";

const mapDispatchToProps = (dispatch: Dispatch, {
    cbHideModal,
  } : {
    cbHideModal?: () => void
  }) => ({
    hideModal () {
      delay().then(() => {
        dispatch(hideModalAction());
      }).
        then(() => {
          if (typeof cbHideModal === "function") {
            cbHideModal();
          }
        });
    },

  }),

  SimpleModal = ({
    hideModal,
    children,
    size,
    title,
  }: SimpleModalPropTypes) => (
    <Modal autoFocus isOpen size={size} toggle={hideModal} zIndex="1061">
      <ModalHeader toggle={hideModal}>
        {title}
      </ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  );

export default connect(null, mapDispatchToProps)(SimpleModal);
