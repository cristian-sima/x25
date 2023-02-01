import * as React from "react";

export type ModalsTypes = Record<string, React.ReactNode>;

type CommonProps = {
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
