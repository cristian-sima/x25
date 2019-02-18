// @flow
/* eslint-disable no-magic-numbers */

type EstimateBoxProps = {
  id: string;
  formValues: any;
};

import { connect } from "react-redux";
import { reduxForm, getFormValues } from "redux-form/immutable";

import React from "react";
import * as Immutable from "immutable";

import Description from "./Description";
import PayBox from "./PayBox";
import Payment from "../";

const formID = "PAY_FOR_COMPANY_INVOICES";

const PayBoxForm = reduxForm({
  form: formID,
})(PayBox);

const formValuesSelector = getFormValues(formID);

const
  mapStateToProps = (state : any) => ({
    formValues: formValuesSelector(state),
  });

const EstimateBox = (props : EstimateBoxProps) => {
  const { id, formValues } = props;

  return (
    <div className="container mt-2">
      <div className="row">
        <div className="col-lg">
          <Description />
        </div>
        <div className="col-lg">
          <Payment
            application="facturare"
            companyID={id}>
            <PayBoxForm
              companyID={id}
              current={formValues}
              initialValues={Immutable.Map({
                Months: 6,
              })}
            />
          </Payment>
        </div>
      </div>
    </div>
  );
};

export default connect(mapStateToProps)(EstimateBox);
