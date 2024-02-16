import * as React from "react";

export type ModalsTypes = Record<string, React.ReactNode>;

export type Modals = Immutable.List<Immutable.Map<string, any>>;

type CommonProps = {
  pleaseClose?: boolean;
  isStack?: boolean;
  isLastOne?: boolean;
  onClose?: () => any;
  doNotCloseByEscape?: boolean;
  preventDispatchHideModal?: boolean;
  Footer?: any;
  Header?: any;
  footerProps?: FooterProps;
  headerProps?: any;
  size?: "lg" | "sm" | "xl" | "";
}

export type ModalWindowProps = CommonProps & {
  customContent?: boolean;
  title: string;
  doNoPassTryToCloseToBody?: boolean;
  children: JSX.Element;
};

export type ConfirmationModalProps = CommonProps & {
  title?: string;
  children?: JSX.Element;
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
