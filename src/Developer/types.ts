export type CommonJSON = {
  readonly height?: number;
  readonly divClass? : string  
}
  
export type InnerDataProps = CommonJSON & {
  readonly data : any;
  readonly isImmutable?: boolean;
}
  
export  type InnerTextProps = CommonJSON & {
  readonly text : string;
}
  