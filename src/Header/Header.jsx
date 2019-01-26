// @flow

type HeaderPropTypes = {
  brand : string;
  accountName : string;
  isAdmin: bool;
  sidebarDocked: boolean;
  ui: {
    showNavbar: boolean;
  };

  toggleNavbar: () => void;

  showSidebar: () => void;
};

import React from "react";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

import AccountOptionsContainer from "./AccountOptionsContainer";
import AdminSelectCompany from "./AdminSelectCompany";
import ClientSelectCompany from "./ClientSelectCompany";
import ToggleMenuButtonContainer from "./ToggleMenuButtonContainer";

import { isSmall } from "./util";

const Header = ({
  brand,
  accountName,
  isAdmin,
  sidebarDocked,
  toggleNavbar,
  ui : { showNavbar },
} : HeaderPropTypes) => (
  <div>
    <Navbar className="d-print-none" color="dark" dark expand="md">
      { sidebarDocked ? null : <ToggleMenuButtonContainer /> }
      <div
        className="brand-wrapper truncate text-left d-inline-block text-light"
        onClick={isSmall() ? toggleNavbar : null}>
        <NavbarBrand>
          {brand}
        </NavbarBrand>
      </div>
      <NavbarToggler className="mt-3 text-dark" onClick={toggleNavbar}>
        {
          showNavbar ? (
            <i className="fa fa-arrow-up text-light" />
          ) : (
            <i className="fa fa-arrow-down text-light" />
          )
        }
      </NavbarToggler>
      <Collapse isOpen={showNavbar} navbar>
        <Nav className="ml-auto" navbar>
          <a className="nav-link" href="/settings/companies">
            {"Setări"}
          </a>
          {
            isAdmin ? (
              <AdminSelectCompany toggleNavbar={toggleNavbar} />
            ) : (
              <ClientSelectCompany toggleNavbar={toggleNavbar} />
            )
          }
          <div className="d-inline-block">
            <AccountOptionsContainer accountName={accountName} />
          </div>
        </Nav>
      </Collapse>
    </Navbar>
  </div>
);

export default Header;
