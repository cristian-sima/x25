import React from "react";
import { ToastContainer } from "react-toastify";
import ModalRoot from "../Modal/Root";

const
  Things = () => (
    <>
      <div className="d-print-none">
        <ToastContainer />
      </div>
      <ModalRoot />
    </>
  );

export default Things;
