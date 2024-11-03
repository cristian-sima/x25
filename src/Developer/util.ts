/* eslint-disable no-magic-numbers */
/* eslint-disable react/no-danger */
/* eslint-disable prefer-named-capture-group */

export const 
  getJSONTags = (json : string) => {
    try {
      let data = json;

      if (!data || data === "") {
        return "";
      }

      data = data.
        replace(/&/gu, "&amp;").
        replace(/</gu, "&lt;").
        replace(/>/gu, "&gt;");

      return data.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\\-]?\d+)?)/gu,
        (match) => {
          let cls = "number";

          if ((/^"/u).test(match)) {
            if ((/:$/u).test(match)) {
              cls = "key";
            } else {
              cls = "string";
            }
          } else if ((/true|false/u).test(match)) {
            cls = "boolean";
          } else if ((/null/u).test(match)) {
            cls = "null";
          }
          return `<span class="${cls}">${match}</span>`;
        },
      );
    } catch (error) {
      return json;
    }
  };