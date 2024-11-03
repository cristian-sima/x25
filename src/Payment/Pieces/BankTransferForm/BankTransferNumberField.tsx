
import Immutable from "immutable";
import React from "react";
import { ImmutableField } from "react-immutable-form";
import { InputTemplate } from "react-immutable-form-with-bootstrap";

type BankTransferNumberFieldProps = {
  readonly inputProps?: React.HTMLAttributes<HTMLElement> & { ref?: React.RefObject<any> };
}

const 
  BankTransferNumberField = (props : BankTransferNumberFieldProps) => {
    const 
      componentProps = React.useMemo(() => Immutable.Map({
        label: "Număr tranzacție",
      }), []);

    return (
      <ImmutableField
        component={InputTemplate}
        componentProps={componentProps}
        inputProps={{
          ...props.inputProps,
          placeholder: "ex. 238747324", 
        }}
        name="TransferNumber"
      />
    );
  };

export default BankTransferNumberField;


