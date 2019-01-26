// @flow

import React from "react";

import { getModal } from "./util";

import SimpleModal from "./SimpleModal";
import { ErrorMessage } from "./Messages";

const NothingSelected = () => (
  <SimpleModal title="Not registred">
    <ErrorMessage
      message="Please define a modal component in Modal/components.jsx"
    />
  </SimpleModal>
);

/* eslint-disable complexity */
const getComponent = (type : any) : any => {
  const AutoModal = getModal(type);

  if (AutoModal !== null) {
    return AutoModal;
  }

  return (
    NothingSelected
  );

};

export default getComponent;
