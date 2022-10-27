/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { ErrorMessage } from "../UI/Messages";
import { getModal } from "./util";
import ModalWindow from "./ModalWindow";

const NothingSelected = () => (
    <ModalWindow onClose={() => {}} title="Not registered">
      <ErrorMessage message="Please define a modal component in Modal/components.jsx" />
    </ModalWindow>
  ),

  /* eslint-disable complexity */
  getComponent = (type: any): any => {
    const AutoModal = getModal(type);

    if (AutoModal !== null) {
      return AutoModal;
    }

    return NothingSelected;
  };

export default getComponent;
