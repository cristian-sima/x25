import React from "react";
import { words } from "src/utility";

export const UpdateApplicationMessage = () => (
  <div className="container mt-5">
    <div className="row">
      <div className="offset-md-1 offset-xl-2 col-md-2 col-xl-1 text-info text-center">
        <i className="fa fa-refresh fa-5x" />
      </div>
      <div className="col-md-8 col-xl-6">
        <h3 className="pb-0">
          {words.UpdateTitle}
        </h3>
        <div className="mt-1 small fst-italic text-muted mb-2 lh-1">
          {`${words.UpdateDescriptionLine1 }.`}
          <br />
          {`${words.UpdateDescriptionLine2 }, `}
          <span className="fw-medium">{words.UpdateDescriptionLine3}</span>
        </div>
        <div className="text-center">
          <button 
            className="btn btn-primary btn-block fw-medium mt-3"
            onClick={()=> window.location.reload()}
            type="button">
            <i className="fa fa-refresh me-1" />
            {words.UpdateButton}
          </button>
        </div>
      </div>
    </div>
  </div>
);