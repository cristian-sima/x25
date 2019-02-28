// @flow

import * as React from "react";

export type SidebarPropTypes = {
  brand: string;
  Menu: any;
  children: React.Node;
  data: any;

  hasError: boolean;
  board: any;

  toggleSidebar: () => void;
  closeSidebar: () => void;
  fixSidebar: () => void;
  updateSidebar: () => void;
  toggleSidebarOpen: () => void;
};

export type SidebarPropTypesContent = {
  Menu: any;
  id?: string;
  ui: {
    sidebarDocked: boolean;
  };
  data: any;
  closeSidebar: () => void;
  fixSidebar: () => void;
};

export type SidebarStateTypes = {
  showNavbar: boolean;
  sidebarDocked: boolean;
  sidebarOpen: boolean;
  sidebarDocked: boolean;
};

import ReactSidebar from "react-sidebar";

import { withRouter } from "react-router-dom";

import { mql } from "../utility";

import { Header, SideworkLogo } from "../Header";

import "./style.scss";

export const styles = {
  sidebar: {
    zIndex: 4,
  },
  overlay: {
    zIndex: 3,
  },
};

const Content = ({ closeSidebar, Menu } : SidebarPropTypesContent) => (
    <div
      className="sidebar d-print-none">
      <div className="hidden-sm-down clearfix">
        <div className="ml-2 mr-2">
          <div className="float-left">
            <SideworkLogo />
          </div>
          <div className="float-right">
            <button
              className="btn btn-outline-secondary btn-sm float-right"
              onClick={closeSidebar}
              style={{ marginRight: 1 }}
              type="button">
              <i aria-hidden="true" className="fa fa-bars" />
            </button>
          </div>
        </div>
      </div>
      <hr className="devider" />
      <Menu />
    </div>
  ),
  SidebarContent = withRouter(Content);

class Sidebar extends React.PureComponent<SidebarPropTypes, SidebarStateTypes> {

  props: SidebarPropTypes;
  state: SidebarStateTypes;

  updateSidebar: () => void;
  toggleNavbar: () => void;
  toggleSidebarOpen: (value : boolean) => void;
  showSidebar: () => void;
  closeSidebar: () => void;

  constructor (props : SidebarPropTypes) {
    super(props);

    this.state = {
      showNavbar    : false,
      sidebarDocked : mql.matches,
      sidebarOpen   : false,
    };

    this.updateSidebar = () => {
      this.setState((current : any) => ({
        sidebarOpen   : !mql.matches && current.sidebarOpen,
        sidebarDocked : mql.matches,
      }));
    };

    this.toggleNavbar = () => {
      this.setState((current : any) => ({
        showNavbar: !current.showNavbar,
      }));
    };

    this.toggleSidebarOpen = (value : boolean) => {
      this.setState({
        sidebarOpen: value,
      });
    };

    this.showSidebar = () => {
      const theMetch = mql.matches;

      this.setState({
        sidebarOpen   : !theMetch,
        sidebarDocked : theMetch,
      });
    };

    this.closeSidebar = () => {
      this.setState({
        sidebarOpen   : false,
        sidebarDocked : false,
      });
    };
  }

  componentDidMount () {
    mql.addListener(this.updateSidebar);
  }

  componentWillUnmount () {
    mql.removeListener(this.updateSidebar);
  }

  render () {
    const { data, children, toggleSidebarOpen } = this.props;

    return (
      <ReactSidebar
        {...this.props}
        contentClassName="sidebar-content"
        docked={this.state.sidebarDocked}
        onSetOpen={toggleSidebarOpen}
        open={this.state.sidebarOpen}
        rootClassName="sidebar-wrapper"
        sidebar={(
          <SidebarContent Menu={this.props.Menu} closeSidebar={this.closeSidebar} />
        )}
        styles={styles}
        touch={false}
        transitions={false}>
        <Header
          brand={this.props.brand}
          company={data}
          showNavbar={this.state.showNavbar}
          showSidebar={this.showSidebar}
          sidebarDocked={this.state.sidebarDocked}
          toggleNavbar={this.toggleNavbar}
        />
        { children }
      </ReactSidebar>
    );
  }
}

export default Sidebar;
