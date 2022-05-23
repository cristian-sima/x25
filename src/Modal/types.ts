import * as React from "react";

export type ModalsTypes = Record<string, React.ReactNode>;

export type ModalWindowProps = {
    onClose: () => any;
    closeByEscape?: boolean;
    children: JSX.Element;
    title: string;
    Footer?: any;
    footerProps?: FooterProps;
    size?: "lg" | "sm" | "xl" | "";
  };

type onConfirmMethodsTypes = {
    startPerforming: () => void;
    endPerforming: (cb: any) => void;
    closeModal: () => void;
  };

export type FooterProps = {
    cancelButtonLabel: string;
    title: string;
    errMessage: string;
    confirmButtonLabel: string;
    tryToClose: () => any;


    readonly confirmButtonColor?:string;
    readonly message: any;
    readonly focusButton: boolean;
    readonly onConfirm: (methods: onConfirmMethodsTypes) => () => void;
    readonly closeModal: () => void;
    readonly showError: (message?: string) => void;
    readonly request: () => Promise<any>;
    readonly onSuccess: (response: any) => void;
    readonly isResponseValid: (response: any) => {
      valid: boolean;
      error: string;
    };
  }
