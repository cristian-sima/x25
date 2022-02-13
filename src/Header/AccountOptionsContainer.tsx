import type { Dispatch } from "@types";

type OptionsContainerPropTypes = {
  readonly accountName: string;
  readonly showLogoutProblem: () => void;
};
type OptionsContainerStateTypes = {
  open: boolean;
  readyToLogout: boolean;
};
import React, { Component } from "react";
import { ButtonDropdown, DropdownToggle, DropdownMenu } from "reactstrap";
import { connect } from "react-redux";
import { words } from "../";
import { notifyError } from "../actions";
import LogoutButton from "./LogoutButton";
import { logOut as logoutRequest } from "./request";

const mapDispatchToProps = (dispatch: Dispatch) => ({
  showLogoutProblem () {
    dispatch(notifyError(words.ConnectionLost));
  },

});

class OptionsContainer extends Component<OptionsContainerPropTypes, OptionsContainerStateTypes> {
  props: OptionsContainerPropTypes;
  state: OptionsContainerStateTypes;
  toggle: () => void;
  logoutAccount: () => void;

  constructor () {
    super();

    this.toggle = () => this.setState((prevState) => ({
      open: !prevState.open,
    }));

    this.logoutAccount = () => {
      const that = this;

      this.setState({
        readyToLogout: false,
      }, () => {
        logoutRequest().then(() => {
          const delay = 800;

          setTimeout(() => {
            document.location.href = "/";
          }, delay);
        }).
          catch(() => {
            that.setState({
              readyToLogout: true,
            });
            that.props.showLogoutProblem();
          });
      });
    };

    this.state = {
      open          : false,
      readyToLogout : true,
    };
  }

  shouldComponentUpdate (nextProps: OptionsContainerPropTypes, nextState: OptionsContainerStateTypes) {
    return this.props.accountName !== nextProps.accountName || this.state.readyToLogout !== nextState.readyToLogout || this.state.open !== nextState.open;
  }

  render () {
    const {
        accountName,
      } = this.props,
      {
        open,
        readyToLogout,
      } = this.state;

    return (<div className="btn-group">
      <ButtonDropdown isOpen={open} toggle={this.toggle}>
        <DropdownToggle caret>
          {words.Options}
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-left">
          <h6 className="dropdown-header">{accountName}</h6>
          <a className="dropdown-item" href="/settings/termeni-si-conditii/all" target="_blank">
            {words.TermsAndConditions}
          </a>
          <a className="dropdown-item" href="/settings/politica-de-confidentialitate/all" target="_blank">
            {words.PrivacyPolicy}
          </a>

          <div className="dropdown-divider" />
          <LogoutButton logoutAccount={this.logoutAccount} readyToLogout={readyToLogout} />
        </DropdownMenu>
      </ButtonDropdown>
    </div>);
  }

}

export default connect(null, mapDispatchToProps)(OptionsContainer);
