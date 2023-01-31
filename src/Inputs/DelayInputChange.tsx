/* eslint-disable max-len */
import React, { useState } from "react";

type TypeInputPropTypes = {
  readonly change: (event: any) => void;
  readonly value: any;
  autoFocus?: boolean;
  readonly tabIndex?: number;
  readonly delay?: number;
  readonly className?: string;
  readonly id?: string;
  readonly autoComplete?: string;
  readonly name?: string;
  readonly placeholder?: string;
};

import { LoadingMessage } from "../Messages";

const delay = 700;

export const
  DelayInputChange = (props : TypeInputPropTypes) => {
    const
      [timeoutValue, setTimeoutValue] = useState(0 as any),
      [isWaiting, setIsWaiting] = useState(false),
      [value, setValue] = useState(props.value),

      stopWaiting = (newValue: string) => {
        clearTimeout(timeoutValue);

        setIsWaiting(false);
        setValue(newValue);

        props.change({
          target: {
            value: newValue,
          },
        });
      },
      handleKeyPressed = (event: any) => {
        if (event.key === "Enter") {
          stopWaiting(value);
        }
      },
      delayChange = ({ target: { value : newValue } } : any) => {
        clearTimeout(timeoutValue);

        if (value === "") {
          stopWaiting(newValue);
        } else {
          setIsWaiting(true);
          setValue(newValue);

          const newTimeout = setTimeout(() => {
            setIsWaiting(false);
            props.change({
              target: {
                value: newValue,
              },
            });
          }, props.delay || delay);

          setTimeoutValue(newTimeout);
        }
      };

    React.useEffect(() => {
      if (props.value !== value) {
        setValue(props.value);
      }
    }, [props.value]);

    return (
      <div className="delay-input">
        <input
          autoComplete={props.autoComplete}
          autoFocus={props.autoFocus}
          className={props.className}
          id={props.id}
          name={props.name}
          onChange={delayChange}
          onKeyPress={handleKeyPressed}
          placeholder={props.placeholder}
          tabIndex={props.tabIndex}
          value={value}
        />
        {isWaiting ? <LoadingMessage className="spinner-border spinner-border-sm text-primary  d-inline-block" sm /> : (
          value === "" ? null : (
            <i
              className={`fa fa-times cursor-pointer
               text-primary clear-value d-inline-block`}
              onClick={() => {
                props.change({
                  target: {
                    value: "",
                  },
                });
              }} />
          )
        )}
      </div>
    );
  };

