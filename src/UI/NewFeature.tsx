import React from "react";

type NewFeatureProps = {
  readonly message?: string;
  readonly description?: string;
}

const NewFeature = (props : NewFeatureProps) => (
  <span className="mx-1">
    <span className="badge rounded-pill text-bg-warning">
      {props.message ?props.message : "Nou"}
    </span>
    {
      props.description ? (
        <span className="text-muted ms-1 small">
          {props.description}
        </span>
      ) : null
    }
  </span>
);

export default NewFeature;
