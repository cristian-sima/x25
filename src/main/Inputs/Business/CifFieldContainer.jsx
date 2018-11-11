// @flow

import type { Dispatch } from "src/types";

type CifFieldContainerPropTypes = {
  input: any;
  meta: {
    submitting: boolean;
    touched: boolean;
    error?: string;
  };
  formID: string;
  findDetailsByCif: (cif: ?string) => () => void;
  onRegisterRef?: (callback : (node : any) => void) => void;
};

type OwnProps = {
  formID: string;
  focusInput: () => void;
};

import React from "react";
import { change, startSubmit, stopSubmit } from "redux-form/immutable";

import { connect } from "react-redux";

import { getCompanyDetails } from "./request";

import { actions } from "main";

import { delay, isValidCIF } from "utility";

import CifField from "./CifField";

const createPromise = (after) => (
  new Promise((resolve) => {
    after();
    setTimeout(() => {
      resolve();
    });
  })
);

const tryToGetInfo = ({ dispatch, cif, focusInput, formID }) => (
  getCompanyDetails(cif).then((response) => {
    const
      before = [createPromise(() => dispatch(actions.notify("Am preluat informațiile")))],
      changes = Object.keys(response).map((key) => () : Promise<any> => (
        createPromise(() => dispatch(change(formID, key, response[key])))
      )),
      after = [
        createPromise(() => dispatch(stopSubmit(formID))),
        createPromise(() => focusInput()),
      ];

    const promises = before.concat(changes).concat(after);

    promises.reduce((prev, cur : any) => prev.then(cur), Promise.resolve());
  }).
    catch(() => {
      delay().
        then(() => {
          dispatch(actions.notifyError("Nu am putut prelua informațiile firmei"));
        }).
        then(() => {
          dispatch(stopSubmit(formID));
        }).
        then(() => {
          focusInput();
        });
    })
);

const
  mapDispatchToProps = (dispatch : Dispatch, { formID, focusInput } : OwnProps) => ({
    findDetailsByCif: (cif : string) => () => {
      dispatch(startSubmit(formID));

      if (isValidCIF(cif)) {
        tryToGetInfo({
          dispatch,
          cif,
          focusInput,
          formID,
        });
      } else {
        delay().
          then(() => {
            dispatch(actions.notifyError("Trebuie furnizat un CIF valid"));
          }).
          then(() => {
            dispatch(stopSubmit(formID));
          }).
          then(() => {
            focusInput();
          });
      }
    },
  });

class CifFieldContainer extends React.Component<CifFieldContainerPropTypes> {
  props: CifFieldContainerPropTypes;

  handleKeyPressed: (event : any) => void;

  constructor (props: CifFieldContainerPropTypes) {
    super(props);

    this.handleKeyPressed = (event : any) => {
      const {
        findDetailsByCif,
        input: { value },
      } = this.props;

      if (event.key === "Enter" && event.shiftKey) {
        event.preventDefault();
        event.stopPropagation();
        findDetailsByCif(value)();
      }
    };
  }

  shouldComponentUpdate (nextProps : CifFieldContainerPropTypes) {
    return (
      this.props.input !== nextProps.input ||
      this.props.meta.submitting !== nextProps.meta.submitting ||
      this.props.meta.touched !== nextProps.meta.touched ||
      this.props.meta.error !== nextProps.meta.error
    );
  }

  render () {
    return (
      <CifField
        {...this.props}
        handleKeyPressed={this.handleKeyPressed}
      />
    );
  }
}

export default connect(null, mapDispatchToProps)(CifFieldContainer);
