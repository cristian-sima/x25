import React from "react";
import { ErrorMessage } from "../Messages";
import { getModal } from "./util";
import SimpleModal from "./SimpleModal";

const NothingSelected = () => (
    <SimpleModal title="Not registered">
      <ErrorMessage message="Please define a modal component in Modal/components.jsx" />
    </SimpleModal>
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
