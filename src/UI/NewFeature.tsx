import React from "react";

type NewFeatureProps = {
  message?: string;
}

const NewFeature = (props : NewFeatureProps) => (
  <>
    <span className="badge rounded-pill text-bg-warning">
      {"Nou"}
    </span>
    <span className="text-muted ms-1 small">
      {props.message}
    </span>
  </>
);

export default NewFeature;
