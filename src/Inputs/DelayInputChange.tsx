import React, { useState } from "react";

type TypeInputPropTypes = {
  readonly change: (event: any) => void;
  readonly value: any;
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
      delayChange = ({ target: { value : newValue } } : { target : { value : string }}) => {
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

    return (
      <div className="delay-input">
        <input
          autoComplete={props.autoComplete}
          className={props.className}
          id={props.id}
          name={props.name}
          onChange={delayChange}
          onKeyPress={handleKeyPressed}
          placeholder={props.placeholder}
          tabIndex={props.tabIndex}
          value={value}
        />
        {isWaiting ? <LoadingMessage className="loading-spinner d-inline-block" sm /> : null}
      </div>
    );
  };

