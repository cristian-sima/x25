export type ErrorMessage = string | undefined;

export type Checker = (value : string, values? : any, checkers? : Checkers) => ErrorMessage;

export type ComponentsOfStringVerification = {
  max?: number;
  min?: number;
  value?: string;
}

export type ComponentsOfStringTenseVerification = {
  max?: number;
  min?: number;
  what: string;
}

export type ComponentsOfNumberVerification = {
  max?: number;
  min?: number;
  integer?: boolean;
}

export type NumberRange = ComponentsOfNumberVerification & {
  value: string;
}
export type StringOptions = {
  min?: number;
  max?: number;
  what?: string;
  optional?: boolean;
};

export type FloatOptions = ComponentsOfNumberVerification & {
  optional?: boolean;
};

export type OptionalOption = {
  optional: boolean;
}

export type CheckerWithOptions<Options> = (options : Options) => Checker;

export type Checkers = {
  [key : string] : Checker;
}

export type Errors = {
  [key : string] : ErrorMessage;
}

export type MessageOption = {
  message?: string;
}
