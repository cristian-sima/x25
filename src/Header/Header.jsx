// @flow

type HeaderPropTypes = {
  brand : string;
  company: any;
  account : any;
  isAdmin: bool;
  sidebarDocked: boolean;
  showNavbar: boolean;

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

import { isSmall } from "./util";

const monthsUntilShowNotice = 30;

const Header = ({
  brand,
  company,
  account,
  isAdmin,
  showPayModal,
  sidebarDocked,
  toggleNavbar,
  showNavbar,
  showSidebar,
} : HeaderPropTypes) => {

  let
    showNoticeToPay = false;

  const
    countDays = typeof company !== "undefined" && account.get("ID") === company.get("OwnerID");

  if (countDays) {
    const daysLeft = moment(company.get("ValabilityDate")).diff(moment().endOf("day"), "days") + 1;

    showNoticeToPay = daysLeft <= monthsUntilShowNotice;
  }

  return (
    <React.Fragment>
      <Navbar className="d-print-none" color="dark" dark expand="md">
        {
          sidebarDocked ? null : (
            <button
              aria-label="Comută meniul"
              className="btn btn-outline-secondary btn-sm mr-2"
              onClick={showSidebar}
              type="button">
              <i className="fa fa-bars" />
            </button>
          )
        }
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
              <AccountOptionsContainer accountName={account.get("Name")} />
            </div>
          </Nav>
        </Collapse>
      </Navbar>
      {
        typeof company === "undefined" || company.size === 0 ? null : (
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
    </React.Fragment>
  );
};

export default Header;
