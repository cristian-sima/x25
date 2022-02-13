import type { State } from "@types";
import React, { Component } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import { selectors } from "../Account/reducer";
import { words } from "../utility";
import { getDefaultCompanyRoute, noOptionsMessage, Option, wrapperClassname as wrapperClassnames, isSmall } from "./util";

const mapStateToProps = (state: State) => ({
  companies: selectors.getCurrentAccountCompanies(state),
});

type ClientSelectCompanyPropTypes = {
  readonly companies: any;
  readonly history: any;
  readonly toggleNavbar: () => void;
};
type ClientSelectCompanyState = {
  inputValue: string;
};

class ClientSelectCompany extends Component<ClientSelectCompanyPropTypes, ClientSelectCompanyState> {
  props: ClientSelectCompanyPropTypes;
  state: ClientSelectCompanyState;
  handleChange: (options: any) => any;
  handleInputChange: (newValue: string) => string;

  constructor (props) {
    super(props);
    this.state = {
      inputValue: "",
    };

    this.handleChange = (options: any) => {
      if (isSmall()) {
        this.props.toggleNavbar();
      }

      this.props.history.push(getDefaultCompanyRoute(options));
    };

    this.handleInputChange = (newValue: string) => {
      const inputValue = newValue.replace(/\W/gu, "");

      this.setState({
        inputValue,
      });
      return inputValue;
    };
  }

  render () {
    const {
        companies,
      } = this.props,
      options = companies.reduce((accumulator, currentValue) => {
        accumulator.push({ ...currentValue.toJS(),
          value : currentValue.get("ID"),
          label : currentValue.get("Name"),
        });
        return accumulator;
      }, []);

    if (companies.size > 1) {
      return (
        <div className={wrapperClassnames}>
          <Select
            components={{
              Option,
            }}
            noOptionsMessage={noOptionsMessage}
            onChange={this.handleChange}
            options={options}
            placeholder={words.SelectCompany}
          />
        </div>
      );
    }

    return null;
  }

}

export default connect(mapStateToProps)(ClientSelectCompany);
