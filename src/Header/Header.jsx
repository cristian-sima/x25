// @flow

type HeaderPropTypes = {
  brand : string;
  company: any;
  accountName : string;
  isAdmin: bool;
  sidebarDocked: boolean;
  ui: {
    showNavbar: boolean;
  };

  toggleNavbar: () => void;

  showSidebar: () => void;
  showPayModal: (id : number) => () => void;
};

import React from "react";
import moment from "moment";
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav } from "reactstrap";

import AccountOptionsContainer from "./AccountOptionsContainer";
import AdminSelectCompany from "./AdminSelectCompany";
import ClientSelectCompany from "./ClientSelectCompany";
import ToggleMenuButtonContainer from "./ToggleMenuButtonContainer";

import { isSmall } from "./util";

const monthsUntilShowNotice = 30;

const Header = ({
  brand,
  company,
  accountName,
  isAdmin,
  sidebarDocked,
  toggleNavbar,
  showPayModal,
  ui : { showNavbar },
} : HeaderPropTypes) => {

  let showNoticeToPay = false;

  if (typeof company !== "undefined") {
    const daysLeft = moment(company.get("ValabilityDate")).diff(moment().endOf("day"), "days") + 1;

    showNoticeToPay = daysLeft <= monthsUntilShowNotice;
  }

  return (
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
      {
        typeof company === "undefined" ? null : (
          showNoticeToPay ? (
            <div className="alert alert-warning m-2">
              {`Abonamentul la serviciile online Sidework va expira ${(
                moment(company.get("ValabilityDate")).
                  endOf("day").
                  fromNow()
              )}. `}
              <button
                className="btn btn-primary"
                onClick={showPayModal(company.get("ID"))}
                type="button">
                {"Reînnoiește abonamentul"}
              </button>
            </div>
          ) : null
        )
      }
    </div>
  );
};

export default Header;
