

import React from "react";
import JSONSyntaxFromText from "./JSONSyntaxFromText";
import { InnerDataProps } from "./types";

const 
  JSONSyntaxFromDataInner = (props : InnerDataProps) => {

    const
      { data, isImmutable = false, height } = props,
      text = React.useMemo(() => JSON.stringify((
        isImmutable ? data.toJS() : data
      ), null,
      "  "), [data]);

    return (
      <JSONSyntaxFromText height={height} text={text} />
    );

  },
  JSONSyntaxFromData = React.memo(JSONSyntaxFromDataInner);

export default JSONSyntaxFromData;