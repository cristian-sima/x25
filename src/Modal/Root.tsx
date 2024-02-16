import React from "react";
import { useSelector } from "react-redux";
import { propsAreEqualCreator } from "../utility/others";
import getComponent from "./getComponent";
import { selectors } from "./reducer";
import { Modals } from "./types";

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
      
            return (
              <Component
                doNotCloseByEscape={isTheLastOne}
                key={index}
                pleaseClose={current.get("pleaseClose")}
                {...current.get("props").toJS()}
              />
            );
          })
        }
      </>
    );
  },
  InnerModalRoot = React.memo(RawModalRoot, propsAreEqual),
  ModalRoot = () => {
    const list = useSelector(selectors.getModals);

    return <InnerModalRoot list={list} />;
  };

export default ModalRoot;
