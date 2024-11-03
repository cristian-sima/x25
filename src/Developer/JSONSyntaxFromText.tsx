/* eslint-disable react/no-danger */
/* eslint-disable no-magic-numbers */

import "./json.scss";

import React from "react";
import { InnerTextProps } from "./types";
import { getJSONTags } from "./util";

const
  InnerText = ({ text, height, divClass } : InnerTextProps) => {

    const
      data = React.useMemo(() => getJSONTags(text), [text]);

    return (
      <pre
        className={`alert alert-secondary ${divClass ? divClass : ""}`} style={{
          height: height ? height : 200,
        }}>
        <span
          className="json-object"
          dangerouslySetInnerHTML={{
            __html: data,
          }}
        />
      </pre>
    );

  },
  JSONSyntaxFromText = React.memo(InnerText);

export default JSONSyntaxFromText;


