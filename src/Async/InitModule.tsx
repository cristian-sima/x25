

import { useDispatch, useSelector } from "react-redux";
import * as React from "react";
import { words } from "../utility";

import { LoadingMessage } from "../Messages/Loading";
import { getIsModuleReady, moduleIsReadyAction } from "../reducer/module";
import type { Loaded } from "./types";
import { initModule } from "./util";


type InitModuleProps = {
  loaded: Loaded;
  props: any;
}

const InitModule = ({ loaded, props } : InitModuleProps) => {
  const
    current = loaded.default,
    { module, Component } = current,
    ready = useSelector((state : any) => getIsModuleReady(state, module)),
    dispatch = useDispatch();

  React.useEffect(() => {
    if (!ready) {
      initModule(current, () => {
        dispatch(moduleIsReadyAction(module));
      });
    }
  }, [ready]);

  if (ready) {
    return <Component {...props} />;
  }

  return (
    <div className="mt-3">
      <LoadingMessage message={words.PleaseWait} />
    </div>
  );
};

export default InitModule;
