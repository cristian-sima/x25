import * as React from "react";

export type ModalsTypes = Record<string, React.ComponentType<any>>;

export type Modals = Immutable.List<Immutable.Map<string, any>>;

type CommonProps = {
  pleaseClose?: boolean;
  isStack?: boolean;
  isLastOne?: boolean;
  onClose?: () => any;
  doNotCloseByEscape?: boolean;
  doNotCloseByBack?: boolean;
  preventDispatchHideModal?: boolean;
  stackIndex?: number;
  Footer?: any;
  Header?: any;
  footerProps?: FooterProps;
  headerProps?: any;
  size?: "lg" | "sm" | "xl" | "fullscreen" | "";
}

export type ModalWindowProps = CommonProps & {
  customContent?: boolean;
  title: string;
  doNoPassTryToCloseToBody?: boolean;
  children: React.JSX.Element;
};

export type ConfirmationModalProps = CommonProps & {
  title?: string;
  children?: React.JSX.Element;
  footerProps: FooterProps
}

export type FooterProps = {
  readonly confirmButtonColor?:string;
  readonly cancelButtonLabel?: string;
  readonly errMessage?: string;
  readonly isResponseValid?: (response: any) => { valid: boolean; error: string; };
  readonly confirmButtonLabel?: string;
  readonly focusButton?: boolean;
  readonly showError?: (message?: string) => void;

  readonly message: any;
  readonly request: () => Promise<any>;
  readonly onSuccess?: (response: any) => void;
  readonly onBeforeSuccessClosing?: (response: any) => void;
}
