import React from "react";

type NewFeatureProps = {
  readonly message?: string;
}

const NewFeature = (props : NewFeatureProps) => (
  <span className="mx-1">
    <span className="badge rounded-pill text-bg-warning">
      {"Nou"}
    </span>
    {
      props.message ? (
        <span className="text-muted ms-1 small">
          {props.message}
        </span>
      ) : null
    }
  </span>
);

export default NewFeature;
