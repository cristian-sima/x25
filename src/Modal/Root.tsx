import React from "react";
import { useSelector } from "react-redux";
import { propsAreEqualCreator } from "../utility/others";
import GlobalModalContext from "./GlobalModalContext";
import getComponent from "./getComponent";
import {
  closeTopModalWindowByBack,
  consumeSkippedPopstate,
  hasMountedModalWindow,
  isTopModalWindowGlobal,
  popModalHistoryEntry,
  pushModalHistoryEntry,
} from "./modalStack";
import { selectors } from "./reducer";
import { Modals } from "./types";

const getTopModalProp = (list : Modals, key : string) : any => {
  if (list.size === 0) {
    return null;
  }

  const
    top : any = list.last(),
    topProps = top?.get("props");

  if (topProps && typeof topProps.get === "function") {
    return topProps.get(key);
  }

  return null;
};

type RawModalRootProps = {
  readonly list: Modals;
}

const
  propsAreEqual = propsAreEqualCreator([], ["list"]),
  RawModalRoot = ({ list } : RawModalRootProps) => {
    if (list.size === 0) {
      return null;
    }

    return  (
      <>
        {
          list.map((current : any, index : number) => {
            const
              modalType = current.get("type"),
              Component = getComponent(modalType),
              isTheLastOne = index !== list.size - 1;

            if (typeof Component === "undefined") {
              return (
                <div key="no-modal">
                  {`No MODAL component for the type [${modalType}] in Modal/components.jsx`}
                </div>
              );
            }

            const theProps = (
              current?.hasIn(["props", "immutableProps"]) ? ({
                modalProps: current.get("props"),
              }) : (
                current.get("props").toJS()
              )
            );

            return (
              <GlobalModalContext.Provider key={index} value>
                <Component
                  doNotCloseByEscape={isTheLastOne}
                  pleaseClose={current.get("pleaseClose")}
                  stackIndex={index}
                  {...theProps}
                />
              </GlobalModalContext.Provider>
            );
          })
        }
      </>
    );
  },
  InnerModalRoot = React.memo(RawModalRoot, propsAreEqual),
  ModalRoot = () => {
    const
      list = useSelector(selectors.getModals),
      hasModals = list.size > 0,
      prevSizeRef = React.useRef(0),
      decreaseFromPopstateRef = React.useRef(0),
      listRef = React.useRef(list);

    listRef.current = list;

    React.useEffect(() => {
      const
        currentSize = list.size,
        prev = prevSizeRef.current;

      if (currentSize > prev) {
        const toPush = currentSize - prev;

        for (let idx = 0; idx < toPush; idx += 1) {
          pushModalHistoryEntry();
        }
      } else if (currentSize < prev) {
        let toPop = prev - currentSize;

        if (decreaseFromPopstateRef.current > 0) {
          const consume = Math.min(decreaseFromPopstateRef.current, toPop);

          decreaseFromPopstateRef.current -= consume;
          toPop -= consume;
        }

        for (let idx = 0; idx < toPop; idx += 1) {
          popModalHistoryEntry();
        }
      }

      prevSizeRef.current = currentSize;
    }, [list.size]);

    React.useEffect(() => {
      const handlePopState = () => {
        if (consumeSkippedPopstate()) {
          return;
        }

        if (!hasMountedModalWindow()) {
          return;
        }

        const
          isTopGlobal = isTopModalWindowGlobal(),
          isBlockedByList = isTopGlobal && Boolean(getTopModalProp(listRef.current, "doNotCloseByBack"));

        if (isBlockedByList || !closeTopModalWindowByBack()) {
          pushModalHistoryEntry();

          return;
        }

        if (isTopGlobal) {
          decreaseFromPopstateRef.current += 1;
        }
      };

      window.addEventListener("popstate", handlePopState);

      return () => {
        window.removeEventListener("popstate", handlePopState);
      };
    }, []);

    React.useEffect(() => {
      if (hasModals) {
        document.body.classList.add("modal-open");
      }

      return () => {
        document.body.classList.remove("modal-open");
      };
    }, [hasModals]);

    return <InnerModalRoot list={list} />;
  };

export default ModalRoot;
