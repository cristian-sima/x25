// @flow

export type SidebarPropTypes = {
  children: any;
  data: any;

  hasError: boolean;
  ui: {
    sidebarOpen: boolean;
    sidebarDocked: boolean;
    mql: any;
  };

  toggleSidebar: () => void;
  closeSidebar: () => void;
  fixSidebar: () => void;
  updateSidebar: () => void;
  toggleSidebarOpen: () => void;
};

export type SidebarPropTypesContent = {
  id?: string;
  ui: {
    sidebarDocked: boolean;
  };
  data: any;
  closeSidebar: () => void;
  fixSidebar: () => void;
};

export type SidebarStateTypes = {
  ui: {
    sidebarDocked: boolean;
  };
  mql: any;
  sidebarOpen: boolean;
  sidebarDocked: boolean;
};
