// @flow

type HeaderPropTypes = {
  +brand : string;
  +company: any;
  +account : any;
  +isAdmin: bool;
  +sidebarDocked: boolean;
  +showNavbar: boolean;

  +toggleNavbar: () => void;

  +showSidebar: () => void;
  +showPayModal: (id : number) => () => void;
};

import React from "react";
import moment from "moment";
import { Collapse } from "reactstrap";

import AccountOptionsContainer from "./AccountOptionsContainer";
import AdminSelectCompany from "./AdminSelectCompany";
import ClientSelectCompany from "./ClientSelectCompany";

import { isSmall } from "./util";

import { words } from "../utility";

const monthsUntilShowNotice = 30;

const Header = ({
  brand, company, account, isAdmin, showPayModal, sidebarDocked,
  toggleNavbar, showNavbar, showSidebar,
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
      <nav className="d-print-none navbar navbar-expand-md navbar-dark bg-dark">
        {
          sidebarDocked ? null : (
            <button
              aria-label={words.Toggle}
              className="btn btn-outline-secondary btn-sm me-2"
              onClick={showSidebar}
              type="button">
              <i className="fa fa-bars" />
            </button>
          )
        }
        <div
          className="brand-wrapper truncate text-left d-inline-block text-light"
          onClick={isSmall() ? toggleNavbar : null}>
          <a className="navbar-brand">
            {brand}
          </a>
        </div>
        <button
          className="mt-3 text-dark navbar-toggler"
          onClick={toggleNavbar}
          type="button">
          {
            showNavbar ? (
              <i className="fa fa-arrow-up text-light" />
            ) : (
              <i className="fa fa-arrow-down text-light" />
            )
          }
        </button>
        <Collapse isOpen={showNavbar} navbar>
          <ul className="ms-auto navbar-nav">
            <a className="nav-link" href="/settings/companies">
              {words.Settings}
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
          </ul>
        </Collapse>
      </nav>
      {
        typeof company === "undefined" || company.size === 0 ? null : (
          showNoticeToPay ? (
            <div className="alert alert-warning m-2">
              {`${words.TheSubscriptionWillExpireIn} ${(
                moment(company.get("ValabilityDate")).
                  endOf("day").
                  fromNow()
              )}. `}
              <button
                className="btn btn-primary"
                onClick={showPayModal(company.get("ID"))}
                type="button">
                {words.RenewSubscription}
              </button>
            </div>
          ) : null
        )
      }
    </React.Fragment>
  );
};

export default Header;
