// @flow

type HeaderPropTypes = {
  brand : string;
  accountName : string;
  sidebarDocked: boolean;
  ui: {
    showNavbar: boolean;
  };

  toggleNavbar: () => void;

  showSidebar: () => void;
};

import React from "react";
import { Link } from "react-router-dom";
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler } from "reactstrap";

import AccountOptionsContainer from "./AccountOptionsContainer";
import ToggleMenuButtonContainer from "./ToggleMenuButtonContainer";

const Header = ({
  brand, accountName, sidebarDocked, toggleNavbar, ui : { showNavbar },
} : HeaderPropTypes) => (
  <Navbar className="d-print-none" color="dark" dark expand="md">
    <NavbarBrand>
      { sidebarDocked ? null : <ToggleMenuButtonContainer /> }
      <span className="text-white">
        {brand}
      </span>
    </NavbarBrand>
    <NavbarToggler className="nav-toggler mt-3" onClick={toggleNavbar} >
      {
        showNavbar ? (
          <i className="fa fa-arrow-up" />
        ) : (
          <i className="fa fa-caret-square-o-down" />
        )
      }
    </NavbarToggler>
    <Collapse isOpen={showNavbar} navbar>
      <Nav className="ml-auto" navbar>
        <Link className="nav-link" to="/admin/companies">
          {"Setări"}
        </Link>
        <div className="form-inline">
          <AccountOptionsContainer accountName={accountName} />
        </div>
      </Nav>
    </Collapse>
  </Navbar>
);

export default Header;
