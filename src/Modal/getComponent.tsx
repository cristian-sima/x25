/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { ErrorMessage } from "../Messages";
import ModalWindow from "./ModalWindow";
import { getModal } from "./util";

const NothingSelected = () => (
    <ModalWindow onClose={() => {}} title="Not registered">
      <ErrorMessage message="Please define a modal component in Modal/components.jsx" />
    </ModalWindow>
  ),

  /* eslint-disable complexity */
  getComponent = (type: any): (props : any) => JSX.Element => {
    const AutoModal = getModal(type);

    if (AutoModal !== null) {
      return AutoModal;
    }

    return NothingSelected;
  };

export default getComponent;
