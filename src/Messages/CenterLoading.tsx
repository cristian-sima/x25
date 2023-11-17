import React from "react";
import { AppLogo } from "../Async";

type CenterLoadingProp = {
  readonly message?: string ;
};

const CenterLoading = ({ message } : CenterLoadingProp) => (
  <div className="center-container">
    <div className="centered-content">
      <div className="center-loading">
        <AppLogo hideName size={100} />
      </div>
      <div className="align-row">
        <div className="special-spinner" />
        {
          message ? (
            <p className="loading-text">{message}</p>
          ) : null
        }
      </div>
      <br />
    </div>
  </div>
);

/*

// <div className="d-flex justify-content-center align-items-center h-100 w-100">
//   <div className="text-center align-self-center">
//     <div className="text-dark center-loading">
//       <AppLogo hideName size={100} />
//     </div>
//     <div className="spinner-border text-secondary me-3 mt-5" role="status">
//       <span className="visually-hidden">{words.LoadingData}</span>
//     </div>
//     {
//       message ? (
//         <span className="fs-2">
//           {message}
//         </span>
//       ) : null
//     }
//   </div>
// </div>
 */

export default CenterLoading;
