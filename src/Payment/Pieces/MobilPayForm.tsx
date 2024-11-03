
import React, { useEffect, useRef } from "react";
import { config } from "src/config";
import { LoadingMessage } from "src/Messages";

type MobilPayFormProp = {
  readonly envKey: string;
  readonly data: string;
}
  
const 
  MobilPayForm = (props : MobilPayFormProp) => {
    const
      { envKey, data } = props,
      formRef = useRef<HTMLFormElement>(null),
      timeoutRef = useRef<any>(null),
      delay = 1000, 
      submit = () => {
        formRef.current?.submit();
      },
  
      startWaiting = () => {
        timeoutRef.current = setTimeout(() => {
          submit();
        }, delay);
      },
  
      stopWaiting = () => {
        clearTimeout(timeoutRef.current);
      };
  
    useEffect(() => {
      startWaiting();
      return () => stopWaiting();
    }, [envKey, data]);

    return (
      <form action={config.MobilPayURL} method="POST" ref={formRef}>
        <input name="env_key" type="hidden" value={envKey} />
        <input name="data" type="hidden" value={data} />
        <LoadingMessage className="mt-5" message="Se inițiază conexiunea..." />
      </form>
    );
  };

export default MobilPayForm;
  