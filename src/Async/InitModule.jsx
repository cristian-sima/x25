// @flow

import type { Dispatch, State } from "src/types";

import React from "react";

import { LoadingMessage } from "../Messages/Loading";
import { injectModals } from "../Modal/util";
import { injectReducer } from "redux-injector";
import { delay } from "../utility";

type InitModulePropTypes = {
  ready: bool;
  props: any;
  route: bool;
  initModule: () => void;
};

type injectPaginatorTypes = {
  key: string,
  itemsReducer: any;
  pagesReducer: any;
};

const injectPaginator = ({ key, itemsReducer, pagesReducer } : injectPaginatorTypes) => {
  injectReducer(`entities.${key}`, itemsReducer);
  injectReducer(`paginations.${key}`, pagesReducer);
};

import { connect } from "react-redux";

import { getIsModuleReady, moduleIsReadyAction } from "../reducer/module";

const
  mapStateToProps = (state : State, { route : { default : { module } } }) => ({
    ready: getIsModuleReady(state, module),
  }),
  mapDispatchToProps = (dispatch : Dispatch, { route }) => ({
    initModule () {
      const { reducers, modals, paginators, module } = route.default;

      delay().
        then(() => {
          if (reducers) {
            if (Array.isArray(reducers)) {
              for (const { key, func } of reducers) {
                injectReducer(key, func);
              }
            } else {
              const { key, func } = reducers;

              injectReducer(key, func);
            }
          }
        }).
        then(() => {
          if (modals) {
            injectModals(modals);
          }
        }).
        then(() => {
          if (paginators) {
            if (Array.isArray(paginators)) {
              for (const paginator of paginators) {
                injectPaginator(paginator);
              }
            } else {
              injectPaginator(paginators);
            }
          }
        }).
        then(() => {
          dispatch(moduleIsReadyAction(module));
        });
    },
  });

class InitModule extends React.Component<InitModulePropTypes> {
  props: InitModulePropTypes;

  componentDidMount () {
    if (!this.props.ready) {
      this.props.initModule();
    }
  }

  shouldComponentUpdate () {
    return (
      true
    );
  }

  render () {
    const { route, ready, props } = this.props;
    const { Component } = route.default;

    if (ready) {
      return <Component {...props} />;
    }

    return (
      <div className="mt-3">
        <LoadingMessage message="Așteaptă un pic..." />
      </div>
    );
  }
}

const WrapInitModule = connect(mapStateToProps, mapDispatchToProps)(InitModule);

const createWrap = (route, props) => (
  <WrapInitModule props={props} route={route} />
);

export default createWrap;
