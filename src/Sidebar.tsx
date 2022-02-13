import * as React from "react";

export type SidebarPropTypes = {
  readonly brand: string;
  readonly Menu: any;
  readonly children: React.ReactNode;
  readonly data: any;
  readonly hasError: boolean;
  readonly board: any;
  readonly toggleSidebar: () => void;
  readonly closeSidebar: () => void;
  readonly fixSidebar: () => void;
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
};
import ReactSidebar from "react-sidebar";
import { mql } from "./utility";
import { Header } from "./Header";

const styles = {
  sidebar: {
    zIndex           : 2,
    position         : "absolute",
    top              : 0,
    bottom           : 0,
    transition       : "transform .3s ease-out",
    WebkitTransition : "-webkit-transform .3s ease-out",
    willChange       : "transform",
    overflowY        : "auto",
  },
  overlay: {
    zIndex : 3,
    left   : 240,
  },
};

class Sidebar extends React.PureComponent<SidebarPropTypes, SidebarStateTypes> {
  state: SidebarStateTypes;
  updateSidebar: () => void;
  toggleNavbar: () => void;
  toggleSidebarOpen: (value: boolean) => void;
  showSidebar: () => void;
  closeSidebar: () => void;

  constructor (props: SidebarPropTypes) {
    super(props);
    this.state = {
      showNavbar    : false,
      sidebarDocked : mql.matches,
      sidebarOpen   : false,
    };

    this.updateSidebar = () => {
      this.setState((current: any) => ({
        sidebarOpen   : !mql.matches && current.sidebarOpen,
        sidebarDocked : mql.matches,
      }));
    };

    this.toggleNavbar = () => {
      this.setState((current: any) => ({
        showNavbar: !current.showNavbar,
      }));
    };

    this.toggleSidebarOpen = (value: boolean) => {
      this.setState({
        sidebarOpen: value,
      });
    };

    this.showSidebar = () => {
      const theMatch = mql.matches;

      this.setState({
        sidebarOpen   : !theMatch,
        sidebarDocked : theMatch,
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
    const {
        data,
        children,
      } = this.props,
      sidebarprops = {
        closeSidebar: this.closeSidebar,
      };

    return (<ReactSidebar {...this.props} contentClassName="wrapper" docked={this.state.sidebarDocked} onSetOpen={this.toggleSidebarOpen} open={this.state.sidebarOpen} rootClassName="page-wrapper dark-theme toggled" sidebar={React.cloneElement(this.props.Menu, sidebarprops)} sidebarClassName="sidebar-wrapper" styles={styles} touch={false} transitions={false}>
      <Header brand={this.props.brand} company={data} showNavbar={this.state.showNavbar} showSidebar={this.showSidebar} sidebarDocked={this.state.sidebarDocked} toggleNavbar={this.toggleNavbar} />
      {children}
            </ReactSidebar>);
  }

}

export default Sidebar;
