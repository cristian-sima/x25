

import type { Dispatch, State } from "src/types";

import { injectReducer } from "redux-injector";
import { connect } from "react-redux";
import * as React from "react";
import { injectModals } from "../Modal/util";
import { delay, words } from "../utility";

type Props = {
  readonly ready: boolean;
  readonly props: any;
  readonly route: RouteType;
  readonly initModule: () => void;
};
type OwnProps = {
  route: RouteType;
  props: any;
};

const injectPaginator = ({
  key,
  itemsReducer,
  pagesReducer,
}: PaginatorType) => {
  injectReducer(`entities.${key}`, itemsReducer);
  injectReducer(`paginations.${key}`, pagesReducer);
};

import { LoadingMessage } from "../Messages/Loading";
import { getIsModuleReady, moduleIsReadyAction } from "../reducer/module";
import type { RouteType, PaginatorType } from "./types";

const
  mapStateToProps = (state: State, {
    route: {
      default: {
        module,
      },
    },
  }: OwnProps) => ({
    ready: getIsModuleReady(state, module),
  }),
  mapDispatchToProps = (dispatch: Dispatch, {
    route,
  }: OwnProps) => ({
    initModule () {
      const {
        reducers,
        modals,
        paginators,
        module,
      } = route.default;

      delay().then(() => {
        if (reducers) {
          if (Array.isArray(reducers)) {
            for (const {
              key,
              func,
            } of reducers) {
              injectReducer(key, func);
            }
          } else {
            const {
              key,
              func,
            } = reducers;

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

class InitModule extends React.Component<Props> {
  componentDidMount () {
    if (!this.props.ready) {
      this.props.initModule();
    }
  }

  shouldComponentUpdate () {
    return true;
  }

  render () {
    const {
        route,
        ready,
        props,
      } = this.props,
      {
        Component,
      } = route.default;

    if (ready) {
      return <Component {...props} />;
    }

    return (
      <div className="mt-3">
        <LoadingMessage message={words.PleaseWait} />
      </div>
    );
  }

}

const WrapInitModule = connect(mapStateToProps, mapDispatchToProps)(InitModule),

  createWrap = (route: RouteType, props: any) => <WrapInitModule props={props} route={route} />;

export default createWrap;
