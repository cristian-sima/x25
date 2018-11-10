// @flow

import type { ModalActionType } from "types";

import React from "react";

import getAdminComponents from "Admin/modals";
import getCompanyComponents from "Company/modals";

import SimpleModal from "./SimpleModal";
import { ErrorMessage } from "main/Messages";

const NothingSelected = () => (
  <SimpleModal title="Not registred">
    <ErrorMessage
      message="Please define a modal component in Modal/components.jsx"
    />
  </SimpleModal>
);

/* eslint-disable complexity */
const getComponent = (type : ModalActionType) : any => {
  const AdminModal = getAdminComponents(type);

  if (AdminModal !== null) {
    return AdminModal;
  }

  const CompanyModal = getCompanyComponents(type);

  if (CompanyModal !== null) {
    return CompanyModal;
  }

  return (
    NothingSelected
  );

};

export default getComponent;
